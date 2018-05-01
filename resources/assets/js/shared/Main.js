import React from "react";

import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "../components/HomePage";
import CreatePage from "../components/pages/CreatePage";

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
    <div className="container" style={styles.content}>
      <Switch>
        <Route
          exact
          path={process.env.MIX_APP_PUBLIC_DIRECTORY}
          component={HomePage}
        />
        <Route
          exact
          path={process.env.MIX_APP_PUBLIC_DIRECTORY + "/pages/create"}
          component={CreatePage}
        />
      </Switch>
    </div>
  </main>
);

export default Main;
