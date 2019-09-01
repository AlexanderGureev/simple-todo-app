import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Dashboard from "./Dashboard";
import PrivateRoute from "./Common/PrivateRoute";
import LoadingPage from "./Common/LoadingPage";

const DEFAULT_TIME_LOADING_PAGE = 2;

const App = () => {
  const [visibleLoadingPage, setVisibleLoadingPage] = useState(true);
  const handleAnimationEnd = () => setVisibleLoadingPage(false);

  return (
    <>
      {/* {visibleLoadingPage && (
        <LoadingPage
          onAnimationEnd={handleAnimationEnd}
          delay={DEFAULT_TIME_LOADING_PAGE}
        />
      )} */}

      <Router>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
