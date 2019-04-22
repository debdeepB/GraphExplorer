import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { ClipLoader } from "react-spinners";

import axios from "axios";
import { Network } from "vis/index-network";

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      minedDataset: null,
      targetDataset: null,
      minedHypotheses: [],
      targetHypotheses: [],
      networks: [],
      hypMap: [],
      loading: false
    };
    this.addMinedHypotheses = this.addMinedHypotheses.bind(this);
    this.addTargetHypotheses = this.addTargetHypotheses.bind(this);
    this.runGraphEditDistance = this.runGraphEditDistance.bind(this);
    this.populateNetworks = this.populateNetworks.bind(this);
  }

  async componentDidMount() {
    await this.fetchDatasets(this.state.datasetId);
    await this.populateNetworks();
  }

  async fetchDatasets(datasetId) {
    try {
      axios.get("http://127.0.0.1:8000/api/datasets/").then(res => {
        this.setState({
          datasets: res.data
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async populateNetworks() {
    var networks = [];
    for (var i = 0; i < 20; i++) {
      networks.push({
        mined: new Network(
          this.refs["graphRef-" + i + "-mined"],
          { nodes: [], edges: [] },
          {}
        ),
        target: new Network(
          this.refs["graphRef-" + i + "-target"],
          { nodes: [], edges: [] },
          {}
        )
      });
    }
    this.setState({
      networks: networks
    });
  }

  convertData(hypList) {
    var data = [];
    for (let i = 0; i < hypList.length; i++) {
      var hypo = hypList[i];
      // convert nodes
      var newNodes = [];
      for (let n = 0; n < hypo.nodes.length; n++) {
        var node = hypo.nodes[n];
        var newNode = {};
        if (newNodes.findIndex(x => x.id === node["node_cluster_id"]) !== -1)
          continue;
        newNode["id"] = node["node_cluster_id"];
        newNode["label"] = node["node_text"];
        newNode["title"] = node["node_cluster_id"];
        newNode["color"] =
          node["is_mention_id"] === true
            ? { background: "#ffb3ff", border: "#d62ad6" }
            : { background: "#bcffff", border: "#2fcfce" };
        newNode["shape"] = node["is_mention_id"] === true ? "triangle" : "dot";
        newNodes.push(newNode);
      }
      // convert edges
      var newEdges = [];
      for (let e = 0; e < hypo.links.length; e++) {
        var edge = hypo.links[e];
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
      }
      data.push({
        nodes: newNodes,
        edges: newEdges,
        name: hypo.graph.name
      });
    }
    return data;
  }

  async addMinedHypotheses(datasetId) {
    const minedDataset = this.state.datasets.find(ds => ds.id === datasetId);
    this.setState({
      minedDataset: minedDataset
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${datasetId}/`
      );
      console.log(data);
      this.setState({
        minedHypotheses: this.convertData(data)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addTargetHypotheses(datasetId) {
    const targetDataset = this.state.datasets.find(ds => ds.id === datasetId);
    this.setState({
      targetDataset: targetDataset
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${datasetId}/`
      );
      console.log(data);
      this.setState({
        targetHypotheses: this.convertData(data)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async runGraphEditDistance() {
    this.setState({
      loading: true
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/scorer/?mined=${
          this.state.minedDataset.id
        }&target=${this.state.targetDataset.id}`
      );
      for (var i = 0; i < data.length; i++) {
        var entry = data[i];
        var mined_index = parseInt(entry[0]);
        var target_index = parseInt(entry[1]);
        var mined_network = this.state.networks[mined_index].mined;
        var target_network = this.state.networks[mined_index].target;
        var mined_nodes = this.state.minedHypotheses[mined_index].nodes;
        var mined_edges = this.state.minedHypotheses[mined_index].edges;
        var target_nodes = this.state.targetHypotheses[target_index].nodes;
        var target_edges = this.state.targetHypotheses[target_index].edges;

        mined_network.body.data.nodes.add(mined_nodes);
        mined_network.body.data.edges.add(mined_edges);
        target_network.body.data.nodes.add(target_nodes);
        target_network.body.data.edges.add(target_edges);
      }
      this.setState({
        hypMap: data,
        loading: false
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const minedDatasetItems = this.state.datasets.map((dataset, index) => {
      return (
        <Dropdown.Item
          onClick={() => this.addMinedHypotheses(dataset.id)}
          key={index}
        >
          {dataset.name}
        </Dropdown.Item>
      );
    });
    const targetDatasetItems = this.state.datasets.map((dataset, index) => {
      return (
        <Dropdown.Item
          onClick={() => this.addTargetHypotheses(dataset.id)}
          key={index}
        >
          {dataset.name}
        </Dropdown.Item>
      );
    });
    const minedDropdownText =
      this.state.minedDataset == null
        ? "Mined Hypotheses"
        : this.state.minedDataset.name;

    const targetDropdownText =
      this.state.targetDataset == null
        ? "Target Hypotheses"
        : this.state.targetDataset.name;

    const createTable = [...Array(21).keys()].slice(1).map((elem, index) => {
      return (
        <div key={index}>
          <div className="row mt-2">
            <div className="col-sm-5" ref={"graphRef-" + index + "-mined"} />
            <div className="col-sm-5" ref={"graphRef-" + index + "-target"} />
          </div>
          <div className="row mt-2">
            <div className="col-sm-5 text-center">
              {this.state.hypMap[index] &&
                this.state.minedHypotheses[this.state.hypMap[index][0]].name}
            </div>
            <div className="col-sm-5 text-center">
              {this.state.hypMap[index] &&
                this.state.targetHypotheses[this.state.hypMap[index][1]].name}
            </div>
            <div
              className="col-sm-2 text-center"
              ref={"graphRef-" + index + "-score"}
            >
              {this.state.hypMap[index] && this.state.hypMap[index][2]}
            </div>
          </div>
          <hr />
        </div>
      );
    });

    const loadingButton = !this.state.loading ? (
      <Button variant="link" onClick={() => this.runGraphEditDistance()}>
        <FontAwesomeIcon icon="fire" size="lg" />
      </Button>
    ) : (
      <ClipLoader
        sizeUnit={"px"}
        size={20}
        color={"#123abc"}
        loading={this.state.loading}
      />
    );

    return (
      <div>
        <div className="card">
          <div className="card-header">Run Graph Edit Distance</div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {minedDropdownText}
                </Dropdown.Toggle>
                <Dropdown.Menu>{minedDatasetItems}</Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {targetDropdownText}
                </Dropdown.Toggle>
                <Dropdown.Menu>{targetDatasetItems}</Dropdown.Menu>
              </Dropdown>
              {loadingButton}
            </div>
            <div />
          </div>
        </div>
        {/* <div className="card mt-2">
          <div className="card-header">Match Hypotheses</div>
          <div className="card-body" />
        </div> */}
        <div className="card">
          <div className="row mt-2">
            <div className="col-sm-5 text-center">Mined Hypotheses</div>
            <div className="col-sm-5 text-center">Target Hypotheses</div>
            <div className="col-sm-2 text-center">Score</div>
          </div>
          {createTable}
        </div>
      </div>
    );
  }
}

export default Evaluation;
