import React, { Component } from "react";
import { DataSet, Network } from "vis/index-network";

import "vis/dist/vis-network.min.css";
import axios from "axios";

class Hypothesis extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;

    this.state = {
      datasetId: params.datasetId,
      nodes: [],
      edges: [],
      dataset: [],
      network: {}
    };
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
        <div className="card-header">Visualization</div>
        <div className="card-body">
          <div ref="graphRef" style={{ height: "1079px", width: "1039px" }} />
        </div>
      </div>
    );
  }
}

export default Hypothesis;
