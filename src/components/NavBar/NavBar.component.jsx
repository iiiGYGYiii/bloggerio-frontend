/* eslint-disable no-constant-condition */
// MODULES
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../reducers/User/userSlice";
//STYLES
import "./NavBar.style.css";
//COMPONENTS
import { Link } from "react-router-dom";

const userSelector = state => state.user;

const NavBar = () =>{
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleLogOutClick = () =>{
    dispatch(logOutAction);
  };
  return(<nav className="navbar">
    <ul className="navbar-nav show">
      <div className="navbar-menu m-right">
        <li className="nav-item brand">
          <Link to="/">
            Blogger.IO
          </Link>
        </li>
        <div className={showMenu?"menu-btn open":"menu-btn"} onClick={()=>setShowMenu(prevState=>!prevState)}>
          <div className="menu-btn-burger"/>
        </div>
      </div>
      <div className="navbar-menu">
        <div className={showMenu? "navbar-menu nav-list show":"navbar-menu nav-list"}>
          <li className="nav-item">
            <Link to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users">
              Users
            </Link>
          </li>
          {user
            ?(<>
              <li className="nav-item dropdown-container" id="disp-user">
                User
                <ul>
                <li className="nav-item">
                  <Link to={`/user/${user.id}`} id="disp-username">
                    {user.username}
                  </Link>
                </li>
                <li id="log-out" onClick={handleLogOutClick} className="nav-item">
                  Log out
                </li>
              </ul>
              </li>
            </>)
            :(<>
              <li className="nav-item">
                <Link id="log-in-a" to="/login">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="sign-up-btn" to="/signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </div>
      </div>
    </ul>
  </nav>);
};

export default NavBar;
