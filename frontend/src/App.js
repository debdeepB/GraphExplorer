/* eslint-disable import/first */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleRight,
  faTrash,
  faFire
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowCircleRight);
library.add(faTrash);
library.add(faFire);

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Datasets from "./components/datasets/datasets";
import Dataset from "./components/datasets/dataset";
import Evaluation from "./components/evaluations/evaluation";
import NavBar from "./components/navbar";
import "./App.css";
import Hypothesis from "./components/evaluations/hypothesis";
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
            <Route exact path="/evaluate/" component={Evaluation} />
            <Route exact path="/hypothesis/:datasetId" component={Hypothesis} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
