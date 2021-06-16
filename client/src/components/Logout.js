import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

//style
import style from "../styles/logout.module.css";
import login from "../images/loginImage.svg";

function Logout() {
  const { userName, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logoutHandler(e) {
    e.preventDefault();
    const res = await axios.get("http://localhost:3001/user/logout");
    //call this to update loggedIn , bcoz getLoggedIn is in effect and is executed only when component mounts,
    //the components update only after refresh(mpunt again) if this method is not called
    await getLoggedIn();
    history.push("/");
  }
  return (
    <div id={style.logoutContainer}>
      <div id={style.user}>
        <img id={style.logoutImage} src={login} alt="" />
        <h3>Hi {userName[0].toUpperCase() + userName.substring(1)} </h3>
      </div>
      <div id={style.logoutBtn}>
        <form onSubmit={logoutHandler}>
          <input value="LOG OUT" type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default Logout;
