import React, { Component } from "react";
import { DataSet, Network } from "vis/index-network";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "vis/dist/vis-network.min.css";

class Hypothesis extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      datasetId: params.datasetId,
      nodes: [],
      edges: [],
      dataset: [],
      network: {},
      search: ""
    };
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/search/179/?search=${this.state.search}`
      );
      var newNodes = this.state.nodes.slice();
      for (let i = 0; i < data.length; i++) {
        newNodes.push(data[i]);
      }
      this.setState({
        nodes: newNodes,
        network: new Network(
          this.refs.graphRef,
          {
            nodes: newNodes,
            edges: this.state.edges
          },
          {}
        )
      });
    } catch (error) {
      console.log(error);
    }
    console.log(this.state.search);
  }

  async componentDidMount() {
    await this.fetchDataset();
    await this.populateNetwork();
  }

  async populateNetwork() {
    var network = new Network(
      this.refs.graphRef,
      { nodes: this.state.nodes, edges: this.state.edges },
      {}
    );
    this.setState({
      network: network
    });
  }

  async fetchDataset() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/datasets/${this.state.datasetId}`
      );
      this.setState({
        dataset: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <form onSubmit={this.handleSubmit} className="input-group">
            <FormControl
              type="text"
              placeholder="Enter topic name"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <Button variant="primary" type="submit" className="input-group-btn">
              Submit
            </Button>
          </form>
        </div>
        <div className="card-body">
          <div ref="graphRef" style={{ height: "1079px", width: "1039px" }} />
        </div>
      </div>
    );
  }
}

export default Hypothesis;
