import React, { useContext } from "react";
import { NavLink ,Link} from "react-router-dom";
import style from "../styles/navbar.module.css";
import AuthContext from "../context/authContext";
import '../index.css'
function NavComponent() {
  const {loggedIn,userName} =useContext(AuthContext)
  return (
    <nav className={style.topnav}>
      <div className={style.leftnav}>
        <NavLink
          className={style.nav}
          exact
          activeClassName="active_nav"
          to="/"
        >
          WEBSITE NAME
        </NavLink>
      </div>
      <div className={style.rightnav}>
        {loggedIn === false && (
          <>
            <NavLink
              className={style.nav}
              exact
              activeClassName="active_nav"
              to="/user/login"
            >
              Login
            </NavLink>
            <NavLink
              className={style.nav}
              exact
              activeClassName="active_nav"
              to="/user/signup"
            >
              Register
            </NavLink>
          </>
        )}
        {loggedIn === true && (
          <>
            <NavLink
              activeClassName="active_nav"
              className={style.nav}
              exact
              to="/blog"
            >
              Blog
            </NavLink>
            
            <NavLink
              className={style.nav}
              exact
              activeClassName="active_nav"
              to="/user/logout"
            >
              Logout
            </NavLink>
            <NavLink
              className={style.nav}
              exact
              activeClassName="active_nav"
              to="/user/find"
            >
              People
            </NavLink>
            <NavLink
              className={style.nav}
              exact
              activeClassName="active_nav"
              to="/contact"
            >
              Contact
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavComponent;
