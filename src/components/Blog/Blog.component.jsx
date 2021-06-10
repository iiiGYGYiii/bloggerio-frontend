//MODULES
import PropTypes from "prop-types";
import { useParams, useHistory, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../reducers/Notification/notificationSlice";
// ACTION CREATORS
import { deleteBlog as deleteBlogAction,
  likeBlog
} from "../../reducers/Blogs/blogsSlice";
// STYLES
import "./Blog.styles.css";

const blogSelector = id => state => state.blogs.find(el=>el.id===id);

const Blog = ({ likesTest }) => {
  const history = useHistory();
  const { id:ID } = useParams();
  const blog = useSelector(blogSelector(ID));
  const activeUser = useSelector(state=>state.user)
  const dispatch = useDispatch();
  if (!blog){
    history.push("/");
    dispatch(updateMessage("404: Blog doesn't exist", true));
  }
  const {author, title, url, user, likes } = blog;  
  const likePost = async() => {
    dispatch(likeBlog(ID, likes));
  };
  const deleteBlog = () => {
    if(window.confirm(`You want to delete ${title} by ${author}?`)){
      dispatch(deleteBlogAction(ID));
      history.push("/");
    }
  };
  return(
    <div className="blog-container">
  <div className="blog-card">
    <h3> {title} </h3> <h4>By: {author} </h4>
    <hr/>
    <p> Url: {url} </p>
    <p> Posted by: <Link id="link-to-user" to={`/user/${user.id}`}>{user.username}</Link> </p>
    <p className="like-par"> Likes: {likes}{activeUser&&<span onClick={likesTest || likePost} className="like-btn">Like! 👍</span>}</p>
    <p>{user.username===activeUser?.username&&
    <span
      id="delete"
      style={{backgroundColor:"red",
        color:"white",
        fontWeight:"bold",
        borderRadius: "6px",
        padding: "5px",
        cursor:"pointer"}}
      onClick={deleteBlog}>
        DELETE
      </span>}
    </p>
  </div></div>);
};

Blog.propTypes = {
  likesTest: PropTypes.func
};

export default Blog;
