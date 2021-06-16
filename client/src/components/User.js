import React from "react";
import style from "../styles/user.module.css";
import login from "../images/loginImage.svg";

function User({ user }) {
  console.log(user )
  return (
    <div id={style.user}>
      <div>
        <img id={style.userProfile} src={login} alt="" />
      </div>
      <div id={style.userDetails}>
        <p>Name - {user.name[0].toUpperCase() + user.name.substring(1)} </p>
        <p>Email - {user.email} </p>
        <p>Semester - {user.semester} </p>
      </div>
    </div>
  );
}

export default User;
