import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import WrongPath from "../../shared/WrongPath";
import CustomInput from "../../shared/CustomInput";
import Button from "../../shared/Button";
import LinkComponent from "./LinkComponent";
import PropTypes from "prop-types";

const styles = {
  itemContainer: {
    flex: 1
  },
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
      links: null,
      redirect: null,
      invalid: false,
      errors: "",
      addLink: false,
      addRedirect: false,
      linkTitle: "",
      redirectTitle: "",
      deleted: false,
      success: "",
      redirectToNewPage: false,
      redirectUrl: ""
    };
    this.toggleAddLink = this.toggleAddLink.bind(this);
    this.toggleAddRedirect = this.toggleAddRedirect.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLinkFormSubmit = this.handleLinkFormSubmit.bind(this);
    this.handleRedirectFormSubmit = this.handleRedirectFormSubmit.bind(this);
    this.handlePageDelete = this.handlePageDelete.bind(this);
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
              redirectUrl: response.page.redirect.url
            });
          }
          this.setState({
            page: response.page,
            links: response.page.links,
            redirect: response.page.redirect
          });
        } else {
          this.setState({
            invalid: true
          });
        }
      })
      .catch(error => {
        this.setState({
          errors: error
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
          this.setState({
            links: [...this.state.links, response.link],
            linkTitle: "",
            success: "Link added successfully"
          });
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

  handleRedirectFormSubmit(e) {
    e.preventDefault();
    let errors = "";
    this.setState({
      errors,
      success: ""
    });
    let pageTitle = this.state.page.title;
    let redirectTitle = this.state.redirectTitle;
    if (pageTitle == "") {
      errors += "Page Title is required.\n";
    }
    if (this.state.redirectTitle == "") {
      errors += "Redirect title or slug is required.\n";
    }
    if (errors != "") {
      this.setState({
        errors
      });
      return;
    }
    fetch(
      process.env.MIX_APP_URL +
        "/api/redirect/" +
        pageTitle +
        "/to/" +
        redirectTitle,
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
          this.setState({
            redirect: response.redirect,
            success: "Redirect configured successfully",
            redirectTitle: ""
          });
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

  handlePageDelete() {
    let pageTitle = this.state.page.title;
    fetch(process.env.MIX_APP_URL + "/api/delete/" + pageTitle, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.message == "Success") {
          this.setState({
            success: "Page deleted successfully",
            deleted: true
          });
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
  toggleAddRedirect() {
    this.setState({
      addRedirect: !this.state.addRedirect
    });
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
  addRedirectForm() {
    return this.state.page ? (
      <form
        className="container-fluid"
        style={{ marginTop: "20px" }}
        onSubmit={this.handleRedirectFormSubmit}
      >
        <h5>Configure Page Redirect </h5>
        <CustomInput
          type="text"
          title={"Redirect Page Title or Slug"}
          name="redirectTitle"
          value={this.state.redirectTitle}
          placeholder={"Redirect Page Title or Slug"}
          onChange={this.handleInput}
        />
        <Button
          action={this.handleRedirectFormSubmit}
          type={"btn btn-primary"}
          title={"Save Page Redirect"}
        />
      </form>
    ) : null;
  }
  render() {
    const {
      page,
      invalid,
      errors,
      addLink,
      links,
      addRedirect,
      redirectToNewPage,
      redirectUrl,
      deleted
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
    return page ? (
      <div style={styles.itemContainer}>
        <h2 style={styles.title}>{page.title}</h2>
        <div style={styles.body}>{page.body}</div>
        {links ? this.renderLinks() : null}
        <div align="right">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.handlePageDelete}
          >
            Delete Page
          </button>
        </div>
        {this.state.success && (
          <div className="text-success">{this.state.success}</div>
        )}
        {this.state.errors && (
          <div className="text-danger">{this.state.errors}</div>
        )}
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

          <div style={{ flex: 1 }}>
            <p>&nbsp;</p>
            <button
              className="btn btn-info btn-sm"
              onClick={this.toggleAddRedirect}
            >
              {addRedirect ? "Close Redirect Form" : "Configure Page Redirect"}
            </button>
            {addRedirect ? this.addRedirectForm() : null}
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default ShowPage;
