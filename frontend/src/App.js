/* eslint-disable import/first */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleRight, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowCircleRight);
library.add(faTrash);

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Datasets from "./components/datasets/datasets";
import Dataset from "./components/datasets/dataset";
import Evaluation from "./components/evaluations/evaluation";
import NavBar from "./components/navbar";
import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavBar />
          <br />
          <Switch>
            <Route exact path="/datasets" component={Datasets} />
            <Route exact path="/datasets/:datasetId" component={Dataset} />
            <Route exact path="/evaluate/:datasetId" component={Evaluation} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
