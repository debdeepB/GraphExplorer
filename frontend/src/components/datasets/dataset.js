import React, { Component } from "react";
import axios from "axios";
import BarGraph from "../charts/BarGraph";

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

  async fetchDataset() {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/datasets/${this.state.datasetId}`
      );
      this.setState({
        dataset: data
      });
    } catch (error) {}
  }

  render() {
    const graphProperties = this.state.graphStats.graph_properties;
    const topKEventSlotTypes = this.state.graphStats.top_k_event_slot_types;
    const topKRelSlotTypes = this.state.graphStats.top_k_rel_slot_types;
    const topKRelations = this.state.graphStats.top_k_relations;

    return (
      <div className="card">
        <div className="card-header">{this.state.dataset.name}</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <BarGraph
                width={450}
                height={250}
                data={graphProperties}
                name="unique properties"
              />
            </div>
            <div className="col">
              <BarGraph
                width={450}
                height={250}
                data={topKEventSlotTypes}
                name="top k event roles"
              />
            </div>
            <div className="w-100" />
            <div className="col">
              <BarGraph
                width={450}
                height={250}
                data={topKRelSlotTypes}
                name="top k relation roles"
              />
            </div>
            <div className="col">
              <BarGraph
                width={450}
                height={250}
                data={topKRelations}
                name="top k relations"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dataset;
