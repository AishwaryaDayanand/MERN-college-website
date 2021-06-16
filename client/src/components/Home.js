import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import college from "../images/homePageColllege.svg";
import facebook from "../images/facebook.svg";
import insta from "../images/insta.svg";
import twitter from "../images/twitter.svg";
import mail from "../images/mail.svg";
import axios from 'axios'
import home from '../images/home.jpg'
const initialState = { name: "", message: "" };
function Home() {
  console.log(window.innerWidth);
  return (
    <div>
      <div>
        <img className={styles.image} src={home} alt="college" />
        <div className={styles.ImageText}>WELCOME TEXT....</div>
      </div>
      <div id={styles.footer}>
        <div id={styles.collegeInfo}>
          <h5>GSKSJTI</h5>
          <h5>K R CIRCLE , BENGALURU - 560001</h5>
          <h5> </h5>
        </div>
        <div className={styles.follow}>
          <h3>Follow us: </h3>
          <a href="###">
            <img style={{ marginTop: "8px" }} src={twitter} alt="twitter" />
          </a>
          <a href="###">
            <img className={styles.icons} src={facebook} alt="facebook" />
          </a>
          <a href="###">
            <img src={insta} alt="insta" />
          </a>
        </div>
        <div className={styles.mail}>
          <img src={mail} alt="mail" />
          <h4>aishaishwarya914@gmail.com</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
