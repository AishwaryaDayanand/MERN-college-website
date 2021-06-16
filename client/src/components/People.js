import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import User from './User';
import style from "../styles/blog.module.css";
import styles from "../styles/user.module.css";

function People() {
    const [interest,setinterest] = useState("all")
    const [users,setUsers] = useState([])
    const [response,setResponse] = useState('')
    useEffect(()=>{
        interestHandler()
    },[interest])
    const interestHandler = ()=>{
        try{

            axios.post("http://localhost:3001/user/find",{interest})
            .then((res)=>{
                setUsers(res.data.users)
                setResponse(res.data.msg)
                setTimeout(() => {
                  setResponse(null);
                }, 1000);
                console.log(res.data.users);
            })
            .catch((err)=>{
                setResponse(err);
                setTimeout(() => {
                  setResponse(null);
                }, 2000);
            })
            
        }catch(err){
                setResponse("sorry try again later");
        }
    }
    function clickHandler(e){
        e.preventDefault();
        setinterest(e.target.value)
    }
    return (
      <div id={style.mainContainer} style={{ paddingTop: "100px" }}>
        <div id={style.links}>
          <input
            value="coding"
            type="submit"
            onClick={clickHandler}
            className={style.link}
          />
          <input
            value="cultural"
            type="submit"
            onClick={clickHandler}
            className={style.link}
          />
          <input
            value="sports"
            type="submit"
            onClick={clickHandler}
            className={style.link}
          />
          <input
            value="technology"
            type="submit"
            onClick={clickHandler}
            className={style.link}
          />
        </div>
        <h6>{response}</h6>
        {/* <h1>{interest}</h1> */}
        <div id={styles.UserContainer}>
          {users.map((user, index) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      </div>
    );
}

export default People
