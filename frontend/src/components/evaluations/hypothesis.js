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
      search: "",
      clicked: []
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
      var incomingNodes = [];
      for (let i = 0; i < data.length; i++) {
        var newNode = {};
        var node = data[i];
        if (this.state.nodes.findIndex(x => x.id === node.id) === -1) {
          newNode["id"] = node["id"];
          newNode["label"] = node["label"];
          newNode["title"] = node["title"];
          newNode["color"] =
            node["type"] === "event"
              ? { background: "#ffb3ff", border: "#d62ad6" }
              : { background: "#bcffff", border: "#2fcfce" };
          newNode["shape"] = node["type"] === "event" ? "triangle" : "dot";
          newNodes.push(newNode);
          incomingNodes.push(newNode);
        }
      }
      this.state.network.body.data.nodes.add(incomingNodes);
      this.setState({
        nodes: newNodes
      });
      await this.addNetworkListener();
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.fetchDataset();
    await this.populateNetwork();
  }

  async addNetworkListener() {
    var that = this;
    this.state.network.on("click", function(properties) {
      var ids = properties.nodes;
      console.log(ids && ids[0]);
      ids && that.fetchNeighbors(ids[0]);
    });
  }

  async fetchNeighbors(id) {
    if (this.state.clicked.findIndex(x => x === id) !== -1) {
      return;
    }
    try {
      var newClicked = this.state.clicked.slice();
      newClicked.push(id);
      this.setState({
        clicked: newClicked
      });

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/getneighbors/${id}/`
      );

      var incomingNodes = [];
      var newNodes = this.state.nodes.slice();
      var newEdges = this.state.edges.slice();
      var incomingEdges = [];
      for (let i = 0; i < data.nodes.length; i++) {
        var newNode = {};
        var node = data.nodes[i];
        if (this.state.nodes.findIndex(x => x.id === node.id) === -1) {
          newNode["id"] = node["id"];
          newNode["label"] = node["label"];
          newNode["title"] = node["title"];
          newNode["color"] =
            node["type"] === "event"
              ? { background: "#ffb3ff", border: "#d62ad6" }
              : { background: "#bcffff", border: "#2fcfce" };
          newNode["shape"] = node["type"] === "event" ? "triangle" : "dot";
          incomingNodes.push(newNode);
          newNodes.push(newNode);
        }
      }
      for (let i = 0; i < data.edges.length; i++) {
        var edge = data.edges[i];
        var newEdge = {};
        newEdge["from"] = edge["from_node_id"];
        newEdge["to"] = edge["to_node_id"];
        newEdge["title"] = edge["title"];
        newEdges.push(newEdge);
        incomingEdges.push(newEdge);
      }

      this.state.network.body.data.nodes.add(incomingNodes);
      this.state.network.body.data.edges.add(incomingEdges);
      this.setState({
        nodes: newNodes,
        edges: newEdges
      });
      await this.addNetworkListener();
    } catch (error) {
      console.log(error);
    }
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
