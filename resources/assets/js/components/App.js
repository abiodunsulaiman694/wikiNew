import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "../shared/Header";
import Main from "../shared/Main";

export default class App extends Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Header />
        <Main />
      </div>
    );
  }
}

if (document.getElementById("app")) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("app")
  );
}
