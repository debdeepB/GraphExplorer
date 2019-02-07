import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Datasets from "./components/datasets/datasets";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavBar />
          <br />
          <Switch>
            <Route exact path="/" component={Datasets} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
