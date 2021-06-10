import { getBlogs,
  deleteBlogService,
  createBlog as cB,
  updateLikes,
  commentBlog as commentService
} from "../../services/blogService";
import { updateMessage } from "../Notification/notificationSlice";
import { logOutAction } from "../User/userSlice";

const initialState = [];
const blogsReducer = (state=initialState, action) =>{
  switch (action.type) {
    case "blogs/ADD_BLOG":
      return [
        ...state,
        action.payload
      ];
    case "blogs/DELETE_BLOG":
      return state.filter(el=>el.id!==action.payload);
    case "blogs/INITIALIZE":
      return action.payload;
    case "blogs/LIKE_BLOG":
      return state.map(el=> el.id===action.payload?{
        ...el,
        likes: el.likes+1
      } : el);
    case "blogs/COMMENT_BLOG":
      return state.map(el=> el.id===action.payload.id?{
        ...el,
        comments: [
          ...el.comments,
          action.payload.comment
        ]
      }:el);
    default:
      return state;
  }
}

export const addBlog = blog =>{
  return{
    type: "blogs/ADD_BLOG",
    payload: blog
  };
};

export const delBlog = id =>{
  return{
    type: "blogs/DELETE_BLOG",
    payload: id
  };
};

export const initBlogs = blogs =>{
  return{
    type: "blogs/INITIALIZE",
    payload: blogs
  };
};

export const likeBlogAction = id =>{
  return{
    type: "blogs/LIKE_BLOG",
    payload: id
  };
};

export const initializeBlogs = async (dispatch, getState)=>{
  const blogs = await getBlogs();
  dispatch(initBlogs(blogs));
};

export const deleteBlog = id => async(dispatch, getState)=>{
  try {
    await deleteBlogService(id);
    dispatch(updateMessage("Blog deleted successfully.", false));
    dispatch(delBlog(id));
    
  } catch (error) {
    dispatch(updateMessage("Ocurred an error while deleting, try again later", true));
  }
};

export const createBlog = blog => async(dispatch, getState)=>{
  try {
    const actualUser = getState().user;
    const data = await cB(blog);
    if (!data.error){
      dispatch(addBlog({
        ...data,
        user: actualUser
      }));
      dispatch(updateMessage("Blog was created successfully! :D", false));
    }
  } catch (error) {
    dispatch(logOutAction);
    dispatch(updateMessage("Session has expired, login again.", true));
    window.localStorage.removeItem("loggedBlogUser");
  }
};

export const likeBlog = (id, likes) => async(dispatch, getState) =>{
  dispatch(likeBlogAction(id));
  await updateLikes(id, likes);
}

export const commentBlogAction = (blogId, comment) =>{
  return{
    type: "blogs/COMMENT_BLOG",
    payload:{
      id:blogId,
      comment
    }
  };
};

export const commentBlog = (blogId, comment) => async(dispatch, getState)=>{
  const response = await commentService(blogId, comment);
  dispatch(commentBlogAction(blogId, response.data));
}

export default blogsReducer;
