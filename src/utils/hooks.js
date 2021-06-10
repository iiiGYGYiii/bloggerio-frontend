// MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../services/blogService";
import { getUser } from "../services/userService";
// ACTION CREATORS
import { initializeBlogs } from "../reducers/Blogs/blogsSlice";
import { logIn } from "../reducers/User/userSlice";
import { initializeUsers } from "../reducers/Users/usersSlice";
const blogsSelector = state => state.blogs;

const getWindowDimensions = () =>{
  const { innerWidth: width, innerHeight: height} = window;
  return{
    width,
    height
  };
};

export const useBlogsDatabase = () =>{
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initializeBlogs);
  },[dispatch]);
  const blogs = useSelector(blogsSelector);
  return blogs;
};

export const useUserFromLocalStorage = () =>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(logIn(loggedUser));
      setToken(loggedUser.token);
    }
  },[dispatch])
};

export const useWindowDimensions = () =>{
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(()=>{
    const handleResize = () =>{
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
  }, []);
  return windowDimensions.width>=690;
};

export const useUsersDatabase = () =>{
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initializeUsers);
    },[dispatch]);
  const users = useSelector(state=>state.users);
  return users;
};

export const useUserFromId = id =>{
  const [user, setUser] = useState(null);
  useEffect(()=>{
    getUser(id).then(res=>setUser(res));
  },[id]);
  return user;
};
