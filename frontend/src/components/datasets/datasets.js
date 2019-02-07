import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "react-router-dom/Link";
import axios from "axios";

class Datasets extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      data: [],
      datasetName: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    this.setState({
      show: false
    });
    axios
      .post("http://127.0.0.1:8000/api/datasets/", {
        name: this.state.datasetName
      })
      .then(res => {
        var clonedArray = this.state.data.slice();
        clonedArray.push(res.data);
        this.setState({
          data: clonedArray
        });
      });
  }

  handleChange(event) {
    this.setState({ datasetName: event.target.value });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/datasets/").then(res => {
      this.setState({
        data: res.data
      });
    });
  }
  render() {
    const { data } = this.state;
    const result = data.map((entry, index) => {
      return (
        <tr key={index}>
          <td>{entry.id}</td>
          <td>{entry.name}</td>
          <td>
            <Link to="/">
              <FontAwesomeIcon icon="arrow-circle-right" />
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Add Dataset
        </Button>
        <br />
        <br />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Dataset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormControl
                type="text"
                placeholder="Add your dataset"
                value={this.state.datasetName}
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>{result}</tbody>
        </Table>
      </div>
    );
  }
}
export default Datasets;
