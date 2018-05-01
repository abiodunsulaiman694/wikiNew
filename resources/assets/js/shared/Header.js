import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const styles = {
  headerBg: {
    display: "flex",
    height: "50px",
    justifyContent: "center"
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    fontSize: "28px",
    textTransform: "uppercase"
  },
  headerNav: {
    flex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "50px"
  },
  nav: {
    color: "#000",
    textDecoration: "none",
    padding: 10
  },
  activeNav: {
    backgroundColor: "palevioletred",
    color: "#ffffff",
    borderRadius: 5
  }
};

class Header extends Component {
  componentDidMount() {
    console.log(process.env);
  }
  render() {
    return (
      <div style={styles.headerBg}>
        <div className="container" style={{ backgroundColor: "#eaecf0" }}>
          <div style={styles.headerTitle}>{process.env.MIX_APP_NAME}</div>
          <div style={styles.headerNav}>
            <NavLink
              style={styles.nav}
              exact
              to={process.env.MIX_APP_PUBLIC_DIRECTORY || "#"}
              activeStyle={styles.activeNav}
            >
              Home
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
