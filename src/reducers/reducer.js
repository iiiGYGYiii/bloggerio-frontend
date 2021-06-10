// MODULES
import { combineReducers } from "redux";
// SLICES
import notificationReducer from "./Notification/notificationSlice";
import blogsReducer from "./Blogs/blogsSlice";
import userReducer from "./User/userSlice";
import usersReducer from "./Users/usersSlice";

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer
});

export default rootReducer;
