import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import CustomInput from "../../shared/CustomInput";
import Button from "../../shared/Button";
import LinkComponent from "./LinkComponent";
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
      loading: true,
      addLink: false,
      linkTitle: "",
      success: "",
      redirectToNewPage: false,
      redirectUrl: ""
    };
    this.toggleAddLink = this.toggleAddLink.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLinkFormSubmit = this.handleLinkFormSubmit.bind(this);
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
  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  handleLinkFormSubmit(e) {
    e.preventDefault();
    let errors = "";
    this.setState({
      errors,
      success: ""
    });
    let pageTitle = this.state.page.title;
    let linkTitle = this.state.linkTitle;
    if (pageTitle == "") {
      errors += "Page Title is required.\n";
    }
    if (this.state.linkTitle == "") {
      errors += "Link title is required.\n";
    }
    if (errors != "") {
      this.setState({
        errors
      });
      return;
    }
    fetch(
      process.env.MIX_APP_URL + "/api/link/" + pageTitle + "/to/" + linkTitle,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.message == "Success") {
          this.setState(
            {
              links: [...this.state.links, response.link],
              success: "Link added successfully"
            },
            () => console.log(this.state.links)
          );
        } else {
          this.setState({
            errors: response.message
          });
        }
      })
      .catch(error => {
        this.setState({
          errors: error
        });
      });
  }
  toggleAddLink() {
    this.setState({
      addLink: !this.state.addLink
    });
  }
  addLinkForm() {
    return this.state.page ? (
      <form
        className="container-fluid"
        style={{ marginTop: "20px" }}
        onSubmit={this.handleLinkFormSubmit}
      >
        <h5>Add new Link to {this.state.page.title}</h5>
        <CustomInput
          type="text"
          title={"Link Title or Slug"}
          name="linkTitle"
          value={this.state.linkTitle}
          placeholder={"Link Title or Slug"}
          onChange={this.handleInput}
        />
        <Button
          action={this.handleLinkFormSubmit}
          type={"btn btn-primary"}
          title={"Add Link"}
        />
      </form>
    ) : null;
  }

  renderLinks() {
    if (this.state.links) {
      return (
        <LinkComponent
          links={this.state.links}
          redirect={this.state.redirect}
        />
      );
    }
    return;
  }

  render() {
    const {
      page,
      invalid,
      errors,
      deleted,
      loading,
      redirectToNewPage,
      redirectUrl,
      addLink,
      links
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
        {links ? this.renderLinks() : null}
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <p>&nbsp;</p>
            <button
              className="btn btn-info btn-sm"
              onClick={this.toggleAddLink}
            >
              {addLink ? "Close Link Form" : "Add new Link"}
            </button>
            {addLink ? this.addLinkForm() : null}
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default ShowPage;
