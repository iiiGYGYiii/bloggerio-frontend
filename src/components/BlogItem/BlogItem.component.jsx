// STYLES
import "./BlogItem.styles.css";
// COMPONENTS
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BlogItem = ({ title, ID}) =>{
  return(<Link to={"/blogs/"+ID} className="blog-item">
    {title}
  </Link>)
};

export default BlogItem;
