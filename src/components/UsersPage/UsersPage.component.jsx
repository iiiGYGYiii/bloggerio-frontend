// MODULES
import { useUsersDatabase } from "../../utils/hooks";
import { Link } from "react-router-dom";
// STYLES
import "./UsersPage.styles.css";

const UsersPage = () =>{
  const users = useUsersDatabase();
  return (<>
    <h1 id="users-title">USERS</h1>
    <hr/>
    <h3>Check what they write about!</h3>
    <ul id="users-table">
    {
      users.map(user=><li className="users-list-item" key={user.id}>
        <Link to={`/user/${user.id}`}>{user.username}</Link>
      </li>)
    }
    </ul>
  </>);
};

export default UsersPage;
