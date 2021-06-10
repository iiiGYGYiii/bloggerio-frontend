import PropTypes from "prop-types";

import "./Button.style.css";

const Button = ({ children, id }) =>(
  <input value={children} id={id} type="submit" className="btn login-btn" />
);

Button.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string
}

export default Button;
