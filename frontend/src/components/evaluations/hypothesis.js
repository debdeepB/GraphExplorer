import React, { Component } from "react";
import { DataSet, Network } from "vis/index-network";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import "vis/dist/vis-network.min.css";

class Hypothesis extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddHypothesis = this.handleAddHypothesis.bind(this);

    this.state = {
      loading: false,
      datasetId: params.datasetId,
      nodes: [],
      edges: [],
      dataset: [],
      network: {},
      search: "",
      clicked: [],
      hypothesis: [],
      hypothesisIdMap: {}
    };
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  async handleAddHypothesis(index) {
    var hypo = this.state.hypothesis[index];
    // add nodes and add edges
    var newNodes = this.state.nodes.slice();
    var incomingNodes = [];
    for (let i = 0; i < hypo.nodes.length; i++) {
      var newNode = {};
      var node = hypo.nodes[i];
      if (
        this.state.nodes.findIndex(x => x.title === node.node_cluster_id) === -1
      ) {
        newNode["id"] = node["node_cluster_id"];
        newNode["label"] = node["node_text"];
        newNode["title"] = node["node_cluster_id"];
        newNode["color"] =
          node["is_mention_id"] === true
            ? { background: "#ffb3ff", border: "#d62ad6" }
            : { background: "#bcffff", border: "#2fcfce" };
        newNode["shape"] = node["is_mention_id"] === true ? "triangle" : "dot";
        incomingNodes.push(newNode);
        newNodes.push(newNode);
      }
    }
    var newEdges = this.state.edges.slice();
    var incomingEdges = [];
    console.log(hypo.nodes);
    console.log(hypo.links);
    for (let i = 0; i < hypo.links.length; i++) {
      var edge = hypo.links[i];
      var newEdge = {};
      newEdge["from"] = hypo.nodes.find(
        x => x.id === edge["source"]
      ).node_cluster_id;
      newEdge["to"] = hypo.nodes.find(
        x => x.id === edge["target"]
      ).node_cluster_id;
      newEdge["title"] = edge["edge_relation"];
      if (edge["annotation"] && edge["annotation"] === "contradicts") {
        newEdge["color"] = {};
        newEdge["color"]["color"] = "red";
        newEdge["dashes"] = true;
        newEdge["width"] = 5;
      } else if (
        edge["annotation"] &&
        edge["annotation"] === "partially-relevant"
      ) {
        newEdge["color"] = {};
        newEdge["color"]["color"] = "blue";
        newEdge["width"] = 5;
      } else if (
        edge["annotation"] &&
        edge["annotation"] === "fully-relevant"
      ) {
        newEdge["color"] = {};
        newEdge["color"]["color"] = "green";
        newEdge["width"] = 5;
      }
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

    console.log(hypo);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      var dataId = this.state.dataset.data.find(
        x => x.file.split(".")[x.file.split(".").length - 1] === "csv"
      ).id;
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/search/${dataId}/?search=${
          this.state.search
        }`
      );
      var newNodes = this.state.nodes.slice();
      var incomingNodes = [];
      for (let i = 0; i < data.length; i++) {
        var newNode = {};
        var node = data[i];
        if (this.state.nodes.findIndex(x => x.title === node.title) === -1) {
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
    await this.fetchHypotheses();
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
      var node = this.state.nodes.find(x => x.id === id);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/searchneighbors/?nid=${node.title}`
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
        var source =
          newNodes.findIndex(x => x.id === edge["from_node_id"]) === -1
            ? edge["nid1"]
            : edge["from_node_id"];
        var target =
          newNodes.findIndex(x => x.id === edge["to_node_id"]) === -1
            ? edge["nid2"]
            : edge["to_node_id"];

        newEdge["from"] = source;
        newEdge["to"] = target;
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

  async fetchHypotheses() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${this.state.datasetId}`
      );
      console.log(data);
      this.setState({
        hypothesis: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const hypList = this.state.hypothesis.map((hyp, index) => {
      return (
        <button
          className="list-group-item list-group-item-action"
          key={index}
          onClick={() => this.handleAddHypothesis(index)}
        >
          {hyp.graph.name}
        </button>
      );
    });
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
              <ClipLoader
                sizeUnit={"px"}
                size={10}
                color={"#123abc"}
                loading={this.state.loading}
              />
            </Button>
          </form>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xs-10 col-sm-3">
              <ul className="list-group">{hypList}</ul>
            </div>
            <div className="col-xs-10 col-sm-9" ref="graphRef" />
          </div>
        </div>
      </div>
    );
  }
}

export default Hypothesis;
