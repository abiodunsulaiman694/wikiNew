import React from "react";
import PropTypes from "prop-types";

const CustomInput = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.oneOf(["text", "number", "email", "date"]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default CustomInput;
