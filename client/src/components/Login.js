import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import {NavLink} from 'react-router-dom'
import { useHistory } from "react-router";
// document.body.style.backgroundColor = "black";
import style from "../styles/login.module.css";
import login from "../images/loginImage.svg";
import mail from "../images/loginMail.svg";
import pwdImage from '../images/loginPassword.svg'
const initialState = {
  email: "",
  password: "",
};
function Login() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const [user, setUser] = useState(initialState);
  const [response, setResponse] = useState("");
  const history = useHistory();

  useEffect(() => {
    return () => {
      setUser({});
      setResponse(""); // This worked for me
    };
  }, []);
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post("http://localhost:3001/user/login", user);
      console.log(res.data);
      setResponse(res.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 1000);
      //call this to update loggedIn , bcoz getLoggedIn is in effect and is executed only when component mounts,
      //the components update only after refresh(mpunt again) if this method is not called
      await getLoggedIn();
      setUser(initialState);
      if (res.data.added) {
        setTimeout(() => {
          history.push("/blog");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setResponse("sorry for inconvinience, try again later");
      setTimeout(() => {
        setResponse(null);
      }, 2000);
    }
  };

  return (
    <div className={style.login_container}>
      <div className={style.loginResponse}>
        <h6>{response}</h6>
      </div>
      <div className={style.loginImage}>
        <img src={login} alt="login" />
        <h3>Login to continue</h3>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className={style.input_container}>
          <img src={mail} className={style.input_img} />
          <input
            className={style.inputText}
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
        </div>
        <div className={style.input_container}>
          <img src={pwdImage} className={style.input_img} />
          <input
            className={style.inputText}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
        </div>
        <div className={style.linkSignUp}>
          <p>
            Don't have an account?{" "}
            <NavLink style={{ textDecoration: "underline" }} to="/user/signUp">
              Sign Up
            </NavLink>{" "}
          </p>
        </div>
        <div className={style.loginSubmitBtn}>
          <input value="login" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
