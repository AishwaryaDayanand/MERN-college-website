import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import style from "../styles/addBlog.module.css";
import styles from "../styles/contact.module.css";
import titleImg from "../images/iconfinder_6860338_float_form_title_widget_icon_512px.png";
import contentImg from "../images/iconfinder_3045429_book_office_pages_read_title_icon_512px.png";
import interestImg from '../images/iconfinder_7791665_interest_like_love_favorite_heart_icon_512px (1).png'
let initialState = {
  title: "",
  interest: "",
  content: "",
};

function AddBlog({update,instance}) {
  const [blog, setBlog] = useState(instance ? instance : initialState);
  const [response, setResponse] = useState("");
  const history = useHistory();
let res;
  const formHandler = async (e) => {
    try {
      e.preventDefault();
      if(!update){
        res = await axios.post("http://localhost:3001/blog/add", blog);
      }
      if(update){
         res = await axios.put(`http://localhost:3001/blog/update/${blog._id}`, {blog:blog});
      }
      setResponse(res.data.msg);
      setTimeout(() => {
        setResponse(null);
      }, 1000);
      setBlog(initialState);
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
    <div id={style.addBlogContainer}>
      <h1 id={styles.contactText}>{update ? "Update" : "Add blog"}</h1>
      <h6> {response ? response : ""} </h6>
      <div>
        <form id={style.addBlogform} onSubmit={formHandler}>
          <div className={style.formInputs}>
            <img src={titleImg} alt="" />
            <input
              className={style.inputElements}
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className={style.formInputs}>
            <img src={interestImg} alt="" />
            <select
              className={style.inputElements}
              value={blog.interest}
              onChange={(e) => setBlog({ ...blog, interest: e.target.value })}
              name="cars"
              id="cars"
            >
              <option value="">Select</option>
              <option value="coding">Coding</option>
              <option value="cultural">cultural</option>
              <option value="sports">sports</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div className={style.formInputs}>
            <img src={contentImg} alt="" />
            <textarea
              className={style.inputElements}
              style={{ fontSize: "20px" }}
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              name="content"
              id=""
              cols="100"
              rows="10"
              placeholder="Content"
            ></textarea>
          </div>
          <div id={styles.logoutBtn}>
            {update ? (
              <input value="Update" style={{ width: "20%" }} type="submit" />
            ) : (
              
            <input value="Add" style={{ width: "20%" }} type="submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
