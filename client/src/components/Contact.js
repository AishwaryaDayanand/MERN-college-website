import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import axios from "axios";
import style from '../styles/contact.module.css'
import login from "../images/loginImage.svg";

const initialState = { name: "", message: "" };

function Contact() {
    const { loggedIn, getLoggedIn, userName } = useContext(AuthContext);
    const [post, setPost] = useState(initialState);
    const [response, setResponse] = useState("");
    useEffect(() => {
      return () => {
        setPost({});
        setResponse(""); // This worked for me
      };
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3001/contact", post)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data.msg);
          setTimeout(() => {
            setResponse(null);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setResponse(err);
          setTimeout(() => {
            setResponse(null);
          }, 2000);
        });
      setPost(initialState);
    };
    return (
      <div id={style.contactContainer}>
        <div id={style.user}>
          <img id={style.logoutImage} src={login} alt="" />
          <h3>Hi {userName[0].toUpperCase() + userName.substring(1)} </h3>
        </div>
        <div id={style.contactText}>
          <h1>Contact Us</h1>
        </div>
        <form id={style.contactForm} onSubmit={handleSubmit}>
          <h3 style={{ color: "#3c5898", fontSize: "20px" }}>
            {response ? response : null}
          </h3>

          <input
            value={post.name}
            className={style.inputArea}
            id={style.name}
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setPost({ ...post, name: e.target.value })}
          />
          <textarea
            value={post.message}
            className={style.inputArea}
            id={style.message}
            name="message"
            id=""
            cols="50"
            rows="10"
            placeholder="Message"
            onChange={(e) => setPost({ ...post, message: e.target.value })}
          ></textarea>
          <div id={style.logoutBtn}>
            <input value="Send" type="submit" />
          </div>
        </form>
      </div>
    );
}

export default Contact
