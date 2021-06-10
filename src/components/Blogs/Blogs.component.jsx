// HOOKS
import { useSelector } from "react-redux";
//STYLES
import './Blogs.style.css';
//COMPONENTS
import BlogForm from "../BlogForm/BlogForm.component";
import BlogItem from "../BlogItem/BlogItem.component";
import Togglable from "../Togglable/Togglable.component";

const userSelector = state => state.user;
const blogsSelector = state => state.blogs;

const Blogs = () =>{
  const user = useSelector(userSelector);
  const blogs = useSelector(blogsSelector);
  return(
    <div className="blogs">
      {
        user&&<Togglable buttonLabel="Create Blog"><BlogForm/></Togglable>
      }
      {
        blogs.sort((a,b)=>b.likes-a.likes).map(blog => <BlogItem
          key={blog.id}
          title={blog.title}
          ID={blog.id}
          />)
      }
    </div>
  );
};

export default Blogs;
