import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import createStore from "./store";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/Common/PrivateRoute";

const store = createStore();

const App = () => (
  <StoreProvider store={store}>
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </StoreProvider>
);

export default App;
