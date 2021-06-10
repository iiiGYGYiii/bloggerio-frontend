//MODULES
import { useState } from "react";
import PropTypes from "prop-types";

//STYLES
import "./Togglable.style.css";

const Togglable = ({ children, buttonLabel }) =>{
  const [showForm, setShowForm] = useState(false);

  const changeShowForm = () =>{
    setShowForm(prevState=>!prevState)
  };

  return(
  <div className={showForm? "show-blog-form showing-form" : "show-blog-form"}> 
    {showForm?
    <>{children} <button className="btn" onClick={changeShowForm}>Close</button> </>:
    <button
      className="btn"
      onClick={changeShowForm}>
      {buttonLabel}
    </button>}
  </div>)
}

Togglable.propTypes={
  children: PropTypes.object,
  buttonLabel: PropTypes.string
}

export default Togglable;
