import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-virtualized/styles.css";
import "antd/dist/antd.css";
import "./index.css";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const App = () => (
  <Router>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
