import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "react-router-dom/Link";
import axios from "axios";
import Dropzone from "react-dropzone";

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
      files: [],
      datasetName: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onDrop(files) {
    console.log(files);
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("yo");
    this.setState({
      show: false
    });
    console.log(this.state.files);
    var formData = new FormData();
    formData.append("name", this.state.datasetName);
    if (this.state.files.length > 0) {
      for (var i = 0; i < this.state.files.length; i++) {
        formData.append("file", this.state.files[i]);
      }
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://127.0.0.1:8000/api/datasets/", formData, config)
      .then(res => {
        var clonedArray = this.state.data.slice();
        clonedArray.push(res.data);
        this.setState({
          data: clonedArray,
          files: []
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
    let table;
    if (result.length > 0) {
      table = (
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
      );
    }
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    let form;
    if (this.state.show) {
      form = (
        <form
          onSubmit={this.handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="card mt-3 mb-3">
            <div className="card-header">Add Dataset</div>
            <div className="card-body">
              <FormControl
                type="text"
                placeholder="Enter topic name"
                value={this.state.datasetName}
                onChange={this.handleChange}
              />
              <section>
                <Dropzone
                  onDrop={this.onDrop.bind(this)}
                  onFileDialogCancel={this.onCancel.bind(this)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drop files here, or click to select files</p>
                    </div>
                  )}
                </Dropzone>
                <aside>
                  <ul>{files}</ul>
                </aside>
              </section>
            </div>
            <div className="card-footer">
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      );
    }
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Add Dataset
        </Button>
        {form}
        {table}
      </div>
    );
  }
}
export default Datasets;
