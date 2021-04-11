import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeContainer from "./homeContainer";

class App extends React.Component {
  render() {
    return (
      <Router>
        <HomeContainer />
      </Router>
    );
  }
}

export { App };
