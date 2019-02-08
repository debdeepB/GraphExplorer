import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "react-router-dom/Link";
import axios from "axios";

class Dataset extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;
    this.state = {
      datasetId: params.datasetId,
      dataset: []
    };
  }
  componentDidMount() {
    this.fetchDataset();
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
    return (
      <div className="card">
        <div className="card-header">{this.state.dataset.name}</div>
        <div className="card-body" />
      </div>
    );
  }
}

export default Dataset;
