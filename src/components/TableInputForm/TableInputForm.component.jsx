import PropTypes from "prop-types";

const InputForm = ({ handleChange, placeHolder, label, ...otherProps }) =>(
  <tr>
  <td>
  <label>{label}:</label>
  </td>
  <td>
  <input
    className="login-input"
    onChange={handleChange}
    placeholder={placeHolder}
    id={label.split(" ").join("-")}
    {...otherProps}
  /></td></tr>
);

InputForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default InputForm;
