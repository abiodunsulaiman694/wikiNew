import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const styles = {
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "20px"
  },
  linkitem: {
    flex: "0 0 30%",
    maxWidth: "30%",
    height: "100px",
    display: "flex",
    marginBottom: "10px",
    backgroundColor: "#ffffff",
    paddingRight: "10px",
    border: "1px #d7d7da solid"
  },
  linkThumbnailDiv: {
    flex: 1
  },
  linkThumbnail: {
    objectFit: "contain",
    height: "100px"
  },
  linkContent: {
    flex: 3,
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    verticalAlign: "top"
  },
  subTitleLink: {
    fontSize: "10px",
    color: "#a8abaf"
  },
  existentLink: {
    color: "#070707"
  },
  nonExistentLink: {
    color: "#f92c1c"
  },
  clearfix: { display: "block" }
};
let counter = 0;
class LinkComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllLinks: false,
      links_length: 0
    };
    this.toggleShowAllLinks = this.toggleShowAllLinks.bind(this);
  }
  componentDidMount() {
    let links_length = 0;
    if (Array.isArray(this.props.links)) {
      links_length = this.props.links.length;
    }
    if (this.props.redirect) {
      if (this.props.redirect.title) {
        links_length++;
      }
    }
    this.setState({
      links_length
    });
    counter = 0;
  }
  toggleShowAllLinks() {
    this.setState({
      showAllLinks: !this.state.showAllLinks
    });
    counter = 0;
  }
  componentWillReceiveProps(nextProps) {
    counter = 0;
  }
  renderLinksAndRedirect(title, existent, redirect = false, key) {
    {
      counter += 1;
    }
    return counter <= 3 || this.state.showAllLinks ? (
      <div style={styles.linkitem} key={key}>
        <div style={styles.linkThumbnailDiv}>
          <img
            src={process.env.MIX_APP_PUBLIC_DIRECTORY + "/images/noimage_.png"}
            style={styles.linkThumbnail}
          />
        </div>
        <div style={styles.linkContent}>
          <div
            style={
              existent || redirect
                ? styles.existentLink
                : styles.nonExistentLink
            }
          >
            {title}
          </div>
          <div style={styles.clearfix} />
          {redirect ? (
            <div style={styles.subTitleLink}>Redirect link</div>
          ) : (
            !existent && (
              <div style={styles.subTitleLink}>Non existent link</div>
            )
          )}
        </div>
      </div>
    ) : null;
  }
  render() {
    console.log(this.props);
    return (
      <div style={styles.linkContainer}>
        {this.props.redirect
          ? this.renderLinksAndRedirect(
              this.props.redirect.title,
              false,
              true,
              null
            )
          : null}
        {this.props.links.map(link =>
          this.renderLinksAndRedirect(
            link.link_title,
            link.existent,
            false,
            link.id
          )
        )}
        {this.state.links_length > 3 && !this.state.showAllLinks ? (
          <button className="btn btn-link" onClick={this.toggleShowAllLinks}>
            Show all links
          </button>
        ) : null}
      </div>
    );
  }
}

LinkComponent.propTypes = {
  links: PropTypes.array,
  redirects: PropTypes.object
};

export default LinkComponent;
