import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  return (
    <button
      style={props.style}
      className={props.type}
      onClick={props.action}
      disabled={props.disabled ? "disabled" : ""}
    >
      {props.title}
    </button>
  );
};
Button.propTypes = {
  action: PropTypes.func.isRequired
};
Button.defaultProps = {
  disabled: false
};
export default Button;
