import React, { Component } from "react";
import { Dropdown, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class TabHypothesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      dataset: null,
      hypotheses: [],
      header: [],
      hypothesesData: []
    };
    this.selectChosenDataset = this.selectChosenDataset.bind(this);
    this.buildTable = this.buildTable.bind(this);
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  async componentDidMount() {
    await this.fetchDatasets();
  }

  downloadCsv() {
    var csvContent = "";

    csvContent += this.state.header.join(",");
    csvContent += "\n";

    this.state.hypothesesData.forEach(function(row) {
      csvContent += row.join(",");
      csvContent += "\n";
    });
    var link = window.document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent)
    );
    link.setAttribute("download", this.state.dataset.name);
    link.click();
  }

  buildTable() {
    // count the max number of events per hypothesis
    var maxEvents = 0;
    for (let i = 0; i < this.state.hypotheses.length; i++) {
      let hyp = this.state.hypotheses[i];
      let count = 0;
      for (let j = 0; j < hyp.nodes.length; j++) {
        if (hyp.nodes[j].is_mention_id) count++;
      }
      if (count > maxEvents) {
        maxEvents = count;
      }
    }
    // count the max degree of an event
    var maxDegree = 0;
    for (let i = 0; i < this.state.hypotheses.length; i++) {
      let hyp = this.state.hypotheses[i];
      for (let j = 0; j < hyp.nodes.length; j++) {
        let node = hyp.nodes[j];
        if (node.is_mention_id) {
          let degree = hyp.links.reduce(function(n, link) {
            return n + (link.source === node.id);
          }, 0);
          maxDegree = Math.max(maxDegree, degree);
        }
      }
    }
    // construct the header
    let header = [];
    header.push("Hypothesis");
    for (let i = 0; i < maxEvents; i++) {
      header.push("Event-" + i);
      for (let j = 0; j < maxDegree; j++) {
        header.push("Arg-" + j);
      }
    }
    // now construct the csv file
    var res = [];
    for (let i = 0; i < this.state.hypotheses.length; i++) {
      let hyp = this.state.hypotheses[i];
      let row = Array(maxEvents + maxDegree * maxEvents + 1).fill("");
      row[0] = hyp.graph.name;
      let eventCount = 0;
      console.log(hyp.graph.name);
      console.log(hyp);

      for (let j = 0; j < hyp.nodes.length; j++) {
        let node = hyp.nodes[j];
        if (node.is_mention_id) {
          let index = eventCount * maxDegree + eventCount + 1;
          row[index++] = node.node_text.replace(/#/g, "").replace(/,/g, "");
          console.log("node_id:" + node.id);
          var edges = hyp.links.filter(
            link => link.source === node.id || link.target == node.id
          );
          console.log("links:" + hyp.links);
          console.log("edges:" + edges);
          for (let k = 0; k < edges.length; k++) {
            var secondNode;
            if (!hyp.nodes[edges[k].source].is_mention_id) {
              secondNode = hyp.nodes[edges[k].source];
            } else if (!hyp.nodes[edges[k].target].is_mention_id) {
              secondNode = hyp.nodes[edges[k].target];
            }
            let edgeRelation = edges[k].edge_relation;
            let argRole =
              edgeRelation.split("_")[edgeRelation.split("_").length - 1] +
              ": " +
              secondNode.node_text;
            row[index++] = argRole.replace(/#/g, "").replace(/,/g, "");
          }
          eventCount++;
        }
      }
      res.push(row.slice());
    }
    this.setState({
      header: header,
      hypothesesData: res
    });
  }

  async selectChosenDataset(datasetId) {
    var dataset = this.state.datasets.find(ds => ds.id === datasetId);
    this.setState({
      dataset: dataset
    });
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/hypotheses/${datasetId}`
      );
      this.setState({
        hypotheses: data
      });
      this.buildTable();
    } catch (error) {}
  }

  async fetchDatasets() {
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

  render() {
    const datasetItems = this.state.datasets.map((dataset, index) => {
      return (
        <Dropdown.Item
          onClick={() => this.selectChosenDataset(dataset.id)}
          key={index}
        >
          {dataset.name}
        </Dropdown.Item>
      );
    });

    const datasetText =
      this.state.dataset === null ? "Select Dataset" : this.state.dataset.name;

    let hypTable;
    let tableHeader;
    let tableBody;
    let downloadBtn;

    if (this.state.header.length > 0) {
      tableHeader = this.state.header.map((entry, index) => {
        return <th key={index}>{entry}</th>;
      });

      tableBody = this.state.hypothesesData.map((entry, index) => {
        return (
          <tr key={index}>
            {entry.map((d, i) => {
              return <td key={"data-" + i}>{d}</td>;
            })}
          </tr>
        );
      });

      downloadBtn = (
        <Button
          variant="primary"
          onClick={() => this.downloadCsv()}
          className="ml-3"
        >
          Download CSV &nbsp;
          <FontAwesomeIcon icon="file-download" />
        </Button>
      );
    }

    if (this.state.dataset) {
      hypTable = (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>{tableHeader}</tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      );
    }

    return (
      <div>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {datasetText}
            </Dropdown.Toggle>
            <Dropdown.Menu>{datasetItems}</Dropdown.Menu>
          </Dropdown>
          {downloadBtn}
        </ButtonGroup>
        {hypTable}
      </div>
    );
  }
}

export default TabHypothesis;
