//import "../style/styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeContainer from "./homeContainer";
//import ProductContainer from "./product.js";
//import CartContainer from "./cart.js";

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
