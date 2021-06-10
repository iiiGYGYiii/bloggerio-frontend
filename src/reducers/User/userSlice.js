import { logIn as lI } from "../../services/blogService";
import { updateMessage } from "../Notification/notificationSlice";
const initialState = null;

const userReducer = (state=initialState, action)=>{
  switch (action.type) {
    case "user/LOGIN":
      return action.payload;
    case "user/LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export const logIn = credentials =>{
  return{
    type: "user/LOGIN",
    payload: credentials
  };
};

export const logOut = {
  type: "user/LOGOUT"
};

export const logOutAction = (dispatch, getState) =>{
  dispatch(logOut);
  window.localStorage.removeItem("loggedBlogUser");
}

export const logInAction = credentials => async (dispatch, getState) =>{
  try {
    const data = await lI(credentials);
    if (!data.error){
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(data));
      dispatch(logIn(data));
    }
  } catch (error) {
    dispatch(updateMessage("Username or Password incorrect.",true));
  }
};

export default userReducer;
