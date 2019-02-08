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
      console.log(data);
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
    const data = [
      {
        name: "Unique count",
        num_unique_entities: 10,
        num_unique_relations: 20,
        num_uniq_provenance: 15
      }
    ];
    return (
      <div className="card">
        <div className="card-header">{this.state.dataset.name}</div>
        <div className="card-body">
          <BarChart width={450} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="num_unique_entities" fill="#8884d8" />
            <Bar dataKey="num_unique_relations" fill="#8884d8" />
            <Bar dataKey="num_uniq_provenance" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default Dataset;
