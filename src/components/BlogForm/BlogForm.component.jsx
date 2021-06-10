// MODULES
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/Blogs/blogsSlice";
//STYLES
import "./BlogForm.style.css";
//COMPONENTS
import TableInputForm from "../TableInputForm/TableInputForm.component";
import Button from "../Button/Button.component";

const emptyBlog = {author:"",title:"", url:""};

const BlogForm = ({ testSubmit }) =>{
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(emptyBlog);

  const handleChange = ({ target }) =>{
    setBlog(prevState=>{
      return{
        ...prevState,
        [target.name]: target.value
      }
    })
  }

  const handleSubmit = e =>{
    e.preventDefault();
    dispatch(createBlog(blog));
    setBlog(emptyBlog);
  };

  return(
    <form className="blog-form" onSubmit={testSubmit || handleSubmit}>
    <table id="blog-form">
    <tbody>
      <TableInputForm
        handleChange={handleChange}
        value={blog.title}
        type="text"
        name="title"
        label="title"
        required
      />
      <TableInputForm
        handleChange={handleChange}
        value={blog.author}
        type="text"
        name="author"
        label="author"
        required
      />
      <TableInputForm
        handleChange={handleChange}
        value={blog.url}
        type="text"
        name="url"
        label="url"
        required
      />
      <tr>
      <td colSpan="2">
      <Button id="submit-blog">
        Create
      </Button>
      </td>
      </tr>
      </tbody>
      </table>
    </form>
  );

}

BlogForm.propTypes = {
  testSubmit: PropTypes.func
};

export default BlogForm;
