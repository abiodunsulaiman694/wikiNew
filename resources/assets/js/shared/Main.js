import React from "react";

import { Switch, Route } from "react-router-dom";
import Header from "./Header";

const styles = {
  main: {
    display: "flex",
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#e7e9ef",
    padding: "20px"
  }
};

const Main = () => (
  <main style={styles.main}>
    <div className="container" style={styles.content} />
  </main>
);

export default Main;
