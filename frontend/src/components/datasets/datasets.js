import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class Datasets extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    const url = "http://127.0.0.1:8000/api/datasets/";

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result
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
          <td />
        </tr>
      );
    });
    return (
      <div>
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
