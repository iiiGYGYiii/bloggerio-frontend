import PropTypes from "prop-types";

import "./InputForm.style.css";

const InputForm = ({ handleChange, placeHolder, label, ...otherProps }) =>(
  <>
  <label id={label.split(" ").join("-")+"-label"}>{label}:</label>
  <input
    className="login-input"
    onChange={handleChange}
    placeholder={placeHolder}
    id={label.split(" ").join("-")}
    {...otherProps}
  /></>
);

InputForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default InputForm;
