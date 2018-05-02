import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      loading: true,
      errors: ""
    };
  }
  componentDidMount() {
    return fetch(process.env.MIX_APP_URL + "/api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.message == "Success") {
          this.setState({
            pages: response.pages,
            loading: false
          });
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

  renderPages() {
    return this.state.pages
      ? this.state.pages.map(page => (
          <div key={page.id} style={{ marginBottom: "20px" }}>
            <h3>{page.title}</h3>
            <div>
              <p>{page.body.substring(0, 100)}...</p>
              <Link
                to={process.env.MIX_APP_PUBLIC_DIRECTORY + "/wiki/" + page.url}
              >
                Read more >>
              </Link>
            </div>
          </div>
        ))
      : null;
  }

  render() {
    const { pages, loading, errors } = this.state;
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : errors ? (
            <div className="text-danger">
              Error loading page.{" "}
              <Link
                to={process.env.MIX_APP_PUBLIC_DIRECTORY}
                className="btn btn-link"
              >
                Retry
              </Link>
            </div>
          ) : pages.length == 0 ? (
            <div>
              Welcome to Wiki. No page yet.{" "}
              <Link
                to={process.env.MIX_APP_PUBLIC_DIRECTORY + "/pages/create"}
                className="btn btn-link"
              >
                Add new Page
              </Link>
            </div>
          ) : (
            this.renderPages()
          )}
        </div>
      </div>
    );
  }
}
export default HomePage;
