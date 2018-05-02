import React from "react";

import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import WrongPath from "./WrongPath";
import HomePage from "../components/HomePage";
import CreatePage from "../components/pages/CreatePage";
import ShowPage from "../components/pages/ShowPage";

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
        <Route
          exact
          path={process.env.MIX_APP_PUBLIC_DIRECTORY + "/wiki/:url"}
          component={ShowPage}
        />
        <Route component={WrongPath} />
      </Switch>
    </div>
  </main>
);

export default Main;
