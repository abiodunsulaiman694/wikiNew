import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CustomInput from "../../shared/CustomInput";
import CustomTextArea from "../../shared/CustomTextArea";
import Button from "../../shared/Button";

const styles = {
  itemContainer: {
    alignItems: "center",
    flex: 1
  },
  buttonStyle: {
    margin: "10px 10px 10px 10px"
  }
};

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPage: {
        title: "",
        body: "",
        url: ""
      },
      success: false,
      loading: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      newPage: {
        ...prevState.newPage,
        [name]: value
      }
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let errors = "";
    const { title, body } = this.state.newPage;
    if (title == "") {
      errors += "Title is required.\n";
    }
    if (body == "") {
      errors += "Body is required.\n";
    }
    if (errors != "") {
      this.setState({
        errors
      });
      return;
    }
    this.setState({
      errors
    });
    let postData = {
      body
    };

    fetch(process.env.MIX_APP_URL + "/api/page/" + title, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.message == "Success") {
          this.setState(prevState => ({
            newPage: {
              ...prevState.newPage,
              title: response.page.title,
              body: response.page.body,
              url: response.page.url
            },
            loading: false,
            success: true
          }));
        } else {
          this.setState({
            errors: response.message,
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
    if (this.state.success) {
      return (
        <Redirect
          to={
            process.env.MIX_APP_PUBLIC_DIRECTORY +
            "/wiki/" +
            this.state.newPage.url
          }
        />
      );
    }
    return (
      <div style={styles.itemContainer}>
        <h2>Add new Page</h2>
        {this.state.errors && (
          <div className="text-danger">{this.state.errors}</div>
        )}
        <form className="container-fluid" onSubmit={this.handleFormSubmit}>
          <CustomInput
            type="text"
            title={"Page Title"}
            name="title"
            value={this.state.newPage.title}
            placeholder={"Enter Page Title"}
            onChange={this.handleInput}
          />{" "}
          <CustomTextArea
            title={"Page details"}
            rows={10}
            cols={20}
            value={this.state.newPage.body}
            name={"body"}
            onChange={this.handleInput}
            placeholder={"Page details"}
          />{" "}
          <Button
            action={this.handleFormSubmit}
            type={"btn btn-primary"}
            title={"Create Page"}
            disabled={this.state.disabled}
          />
        </form>
      </div>
    );
  }
}

export default CreatePage;
