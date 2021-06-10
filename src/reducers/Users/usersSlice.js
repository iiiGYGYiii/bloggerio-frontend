import { getUsers } from "../../services/userService";

const initialState = [];
const usersReducer = (state=initialState, action) =>{
  switch (action.type) {
    case "users/ADD_USER":
      return [...state,
      action.payload];
    case "users/INITIALIZE_USERS":
      return action.payload;
    default:
      return state;
  }
};

export const addUser = user =>{
  return{
    type: "users/ADD_USER",
    payload: user
  }
}

export const initUsers = users =>{
  return {type: "users/INITIALIZE_USERS",
  payload: users}
};

export const initializeUsers = async (dispatch, getState) =>{
  const users = await getUsers();
  dispatch(initUsers(users));
}

export default usersReducer;
