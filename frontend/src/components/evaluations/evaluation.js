import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import axios from "axios";

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      minedDataset: null,
      targetDataset: null,
      minedHypotheses: [],
      targetHypotheses: []
    };
    this.addMinedHypotheses = this.addMinedHypotheses.bind(this);
    this.addTargetHypotheses = this.addTargetHypotheses.bind(this);
    this.runGraphEditDistance = this.runGraphEditDistance.bind(this);
  }

  async componentDidMount() {
    await this.fetchDatasets(this.state.datasetId);
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

  async addMinedHypotheses(datasetId) {
    const minedDataset = this.state.datasets.find(ds => ds.id == datasetId);
    this.setState({
      minedDataset: minedDataset
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${datasetId}/`
      );
      console.log(data);
      this.setState({
        minedHypotheses: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addTargetHypotheses(datasetId) {
    const targetDataset = this.state.datasets.find(ds => ds.id == datasetId);
    this.setState({
      targetDataset: targetDataset
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${datasetId}/`
      );
      console.log(data);
      this.setState({
        targetHypotheses: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  async runGraphEditDistance() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/scorer/?mined=${
          this.state.minedDataset.id
        }&target=${this.state.targetDataset.id}`
      );
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
              <Button
                variant="link"
                onClick={() => this.runGraphEditDistance()}
              >
                <FontAwesomeIcon icon="fire" size="lg" />
              </Button>
            </div>
            <div />
          </div>
        </div>
        {/* <div className="card mt-2">
          <div className="card-header">Match Hypotheses</div>
          <div className="card-body" />
        </div> */}
      </div>
    );
  }
}

export default Evaluation;
