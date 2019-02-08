import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "react-router-dom/Link";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

class Dataset extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;
    this.state = {
      datasetId: params.datasetId,
      dataset: [],
      graphStats: []
    };
  }
  componentDidMount() {
    this.fetchDataset();
    this.fetchEda();
  }

  async fetchEda() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/eda/${this.state.datasetId}`
      );
      this.setState({
        graphStats: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  fetchDataset() {
    const { data } = axios
      .get(`http://127.0.0.1:8000/api/datasets/${this.state.datasetId}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          dataset: res.data
        });
      });
  }

  render() {
    console.log("graphstats");
    console.log(this.state.graphStats);

    const graphProperties = this.state.graphStats.graph_properties;
    const topKEventSlotTypes = this.state.graphStats.top_k_event_slot_types;
    const topKRelSlotTypes = this.state.graphStats.top_k_rel_slot_types;
    const topKRelations = this.state.graphStats.top_k_relations;

    const graphPropertiesData = [
      { ...{ name: "unique properties" }, ...graphProperties }
    ];
    const topKEventSlotTypesData = [
      { ...{ name: "top k event slot types" }, ...topKEventSlotTypes }
    ];
    const topKRelSlotTypesData = [
      { ...{ name: "top k relation slot types" }, ...topKRelSlotTypes }
    ];
    const topKRelationsData = [
      { ...{ name: "top k relations" }, ...topKRelations }
    ];

    const graphPropertiesBars =
      graphProperties &&
      Object.keys(graphProperties).map((key, value) => {
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });
        return <Bar dataKey={key} fill={randomColor} />;
      });
    const topKEventSlotTypesBars =
      topKEventSlotTypes &&
      Object.keys(topKEventSlotTypes).map((key, value) => {
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });
        return <Bar dataKey={key} fill={randomColor} />;
      });
    const topKRelSlotTypesBars =
      topKRelSlotTypes &&
      Object.keys(topKRelSlotTypes).map((key, value) => {
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });
        return <Bar dataKey={key} fill={randomColor} />;
      });

    const topKRelationsBars =
      topKRelations &&
      Object.keys(topKRelations).map((key, value) => {
        var randomColor = "#000000".replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        });
        return <Bar dataKey={key} fill={randomColor} />;
      });

    return (
      <div className="card">
        <div className="card-header">{this.state.dataset.name}</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <BarChart width={450} height={250} data={graphPropertiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {graphPropertiesBars}
              </BarChart>
            </div>
            <div className="col">
              <BarChart width={450} height={250} data={topKEventSlotTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {topKEventSlotTypesBars}
              </BarChart>
            </div>
            <div className="w-100" />
            <div className="col">
              <BarChart width={450} height={250} data={topKRelSlotTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {topKRelSlotTypesBars}
              </BarChart>
            </div>
            <div className="col">
              <BarChart width={450} height={250} data={topKRelationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {topKRelationsBars}
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dataset;
