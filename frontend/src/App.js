/* eslint-disable import/first */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowCircleRight);

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
