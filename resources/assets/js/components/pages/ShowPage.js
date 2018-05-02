import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const styles = {
  itemContainer: {},
  title: {
    color: "#676b74",
    textTransform: "uppercase"
  },
  body: {
    color: "#626470",
    fontSize: "12px"
  }
};

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      invalid: false,
      errors: "",
      loading: true
    };
  }

  componentDidMount() {
    let url = this.props.match.params.url;
    return fetch(process.env.MIX_APP_URL + "/api/wiki/" + url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.message == "Success") {
          if (response.page.redirect_id) {
            this.setState({
              redirectToNewPage: true,
              redirectUrl: response.page.redirect.url,
              loading: false
            });
          }
          this.setState({
            page: response.page,
            links: response.page.links,
            redirect: response.page.redirect,
            loading: false
          });
        } else {
          this.setState({
            invalid: true,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          errors: error,
          loading: false
        });
      });
  }

  render() {
    const {
      page,
      invalid,
      errors,
      deleted,
      loading,
      redirectToNewPage,
      redirectUrl
    } = this.state;
    if (redirectToNewPage) {
      return (
        <Redirect
          to={process.env.MIX_APP_PUBLIC_DIRECTORY + "/wiki/" + redirectUrl}
        />
      );
    }
    if (deleted) {
      return <Redirect to={process.env.MIX_APP_PUBLIC_DIRECTORY} />;
    }
    if (invalid) {
      return <Redirect to={process.env.MIX_APP_PUBLIC_DIRECTORY + "/404"} />;
    }
    return loading ? (
      <div>Loading...</div>
    ) : page ? (
      <div style={styles.itemContainer}>
        <h2 style={styles.title}>{page.title}</h2>
        <div style={styles.body}>{page.body}</div>
      </div>
    ) : null;
  }
}

export default ShowPage;
