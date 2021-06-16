import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

//style
import style from '../styles/login.module.css'
import login from "../images/loginImage.svg";
import mail from "../images/loginMail.svg";
import pwdImage from "../images/loginPassword.svg";
import interest from '../images/interest.svg'
import mobile from '../images/mobile.svg'
import studenName from '../images/studentName.svg'
import semester from '../images/semester.svg'
const initialState = {
  name: "",
  semester:"" ,
  email: "",
  interest:"",
  mobile: "",
  password: "",
  passwordAgain: "",
};
function Register() {
  const history = useHistory();
  const [user, setUser] = useState(initialState);
  const [response, setResponse] = useState(null);
  const { getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      setUser({});
      setResponse(""); // This worked for me
    };
  }, []);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3001/user/register", user);
      console.log(res.data);
      setResponse(res.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 2000);

      await getLoggedIn();
      setUser(initialState);

      if(res.data.added){
        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    } catch (err) {
      console.log(err);
      setResponse(err.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 2000);
    }
  }
    return (
      <div className={style.login_container}>
        <div className={style.loginResponse}>
          <h1>{response}</h1>
        </div>
        <div className={style.loginImage}>
          <img src={login} alt="login" />
          <h3>Sign Up.. to continue</h3>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className={style.input_container}>
            <img src={studenName} className={style.input_img} />
            <input
              className={style.inputText}
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="name"
            />
          </div>

          <div className={style.input_container}>
            <img src={semester} className={style.input_img} />
            <input
              className={style.inputText}
              type="text"
              value={user.semester}
              onChange={(e) => setUser({ ...user, semester: e.target.value })}
              placeholder="semester"
            />
          </div>
          <div className={style.input_container}>
            <img src={mail} className={style.input_img} />
            <input
              className={style.inputText}
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email id"
            />
          </div>
          <div className={style.input_container}>
            <img src={mobile} className={style.input_img} />
            <input
              className={style.inputText}
              type="text"
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              placeholder="mobile"
            />
          </div>
          <div className={style.input_container}>
            <img src={interest} className={style.input_img} />

            <select
              className={style.inputText}
              value={user.interest}
              onChange={(e) => setUser({ ...user, interest: e.target.value })}
            >
              <option value="">interested in</option>
              <option value="coding">coding</option>
              <option value="cultura">cultural</option>
              <option value="sports">sports</option>
              <option value="technology">Technology</option>
            </select>
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
          <div className={style.input_container}>
            <img src={pwdImage} className={style.input_img} />
            <input
              className={style.inputText}
              type="password"
              value={user.passwordAgain}
              onChange={(e) =>
                setUser({ ...user, passwordAgain: e.target.value })
              }
              placeholder="confirm password"
            />
          </div>

          <div className={style.linkSignUp}>
            <p>
              Already have an account?{" "}
              <NavLink style={{ textDecoration: "underline" }} to="/user/login">
                Login
              </NavLink>{" "}
            </p>
          </div>
          <div className={style.loginSubmitBtn}>
            <input value="sign up" type="submit" />
          </div>
        </form>
      </div>
    );
  };

export default Register;
