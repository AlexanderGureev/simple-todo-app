import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import createStore from "./store";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/Common/PrivateRoute";
import LoadingPage from "./components/Common/LoadingPage";

const DEFAULT_TIME_LOADING_PAGE = 2;
const store = createStore();

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
      <StoreProvider store={store}>
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </StoreProvider>
    </>
  );
};
export default App;
