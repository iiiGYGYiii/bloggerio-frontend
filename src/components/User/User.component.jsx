// MODULES
import { useParams, Link } from "react-router-dom";
import { useUserFromId } from "../../utils/hooks";
// STYLES
import "./User.styles.css";

const User = () =>{
  const { id } = useParams();
  const user = useUserFromId(id);
  return user?(<main>
    {user.name&&<h2>{user.name}</h2>}
    <h3>@{user.username}</h3>
    <hr/>
    <h2>Blogs posted: {user.blogs.length}</h2>
    <ul className="display-list">
      {
        user.blogs.map(blog=><li className="users-list-item user-blogs-item" key={blog.id}>
          <Link to={"/blogs/"+blog.id}>
            {blog.title}
          </Link>
        </li>)
      }
    </ul>

  </main>):<main><h1>404 NOT FOUND</h1></main>;
};

export default User;
