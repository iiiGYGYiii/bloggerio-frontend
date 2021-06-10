// MODULES}
import { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { updateMessage } from "../../reducers/Notification/notificationSlice";
import { addUser } from "../../reducers/Users/usersSlice"
import { signUp } from "../../services/userService";
// STYLES
import "./SignUpForm.styles.css";
//COMPONENTS
import InputForm from "../InputForm/InputForm.component";
import Button from "../Button/Button.component";
import DisplayMessage from "../DisplayMessage/DisplayMessage.component";

const initialState = {
  name:"",
  username:"",
  password:"",
  confirmPassword:""
}

const SignUpForm = () =>{
  const user = useSelector(state=>state.user);
  const [userCredentials, setUserCredentials] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleChange = e =>{
    setUserCredentials(prevState=>{
      return{
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const handleSignUpClick = async e =>{
    e.preventDefault();
    if (userCredentials.password !== userCredentials.confirmPassword){
      dispatch(updateMessage("Passwords don't match.", true));
      return;
    }
    if (/\W/.test(userCredentials.username)){
      dispatch(updateMessage("Username cannot contain special characters.", true));
      return;
    }
    try {
      const createdUser = await signUp({
        username: userCredentials.username,
        name: userCredentials.name,
        password: userCredentials.password
      });
      dispatch(addUser(createdUser));
      dispatch(updateMessage("User created successfully!", false));
      history.push("/");
      setUserCredentials(initialState);
    } catch (error) {
      dispatch(updateMessage(error.response?.data.error, true));
    }
  }

  return user? <Redirect to="/"/>:(
    <>
      <h1 id="log-in-header">Sign up to <span className="brand">Blogger.IO</span></h1>
      <DisplayMessage/>
      <form className="log-in-form" onSubmit={handleSignUpClick}>
      <InputForm
          handleChange={handleChange}
          value={userCredentials.name}
          type="text"
          name="name"
          label="name"
          required
        />
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
        <InputForm
          handleChange={handleChange}
          value={userCredentials.confirmPassword}
          type="password"
          name="confirmPassword"
          label="confirmPassword"
          required
        />
        <Button id="sign-up-btn">
          Sign Up!
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
