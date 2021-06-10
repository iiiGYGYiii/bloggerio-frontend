//MODULES
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { logInAction } from "../../reducers/User/userSlice";
//STYLES
import "./LogInForm.style.css";
//COMPONENTS
import InputForm from "../InputForm/InputForm.component";
import Button from "../Button/Button.component";

const emptyCredentials = {
  username: "",
  password: ""
};

const LogInForm = () =>{
  const user = useSelector(state=>state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState(emptyCredentials);
  const handleChange = ({ target }) => {
    setUserCredentials(prevState=>{
      return{
        ...prevState,
        [target.name]: target.value
      }
    });
  };
  const handleLogInClick = e =>{
    e.preventDefault();
    dispatch(logInAction(userCredentials));
    setUserCredentials(emptyCredentials);
    history.push("/");
  };
  return user? <Redirect to="/"/>:(<>
  <h1 id="log-in-header">Log in to <span className="brand">Blogger.IO</span></h1>
  <form className="log-in-form" onSubmit={handleLogInClick}>
    <InputForm
      handleChange={handleChange}
      value={userCredentials.username}
      type="text"
      name="username"
      label="username"
      required
    />
    <InputForm
      handleChange={handleChange}
      value={userCredentials.password}
      type="password"
      name="password"
      label="password"
      required
    />
    <Button id="log-in">
      Log In
    </Button>
  </form></>
  );
}

export default LogInForm;
