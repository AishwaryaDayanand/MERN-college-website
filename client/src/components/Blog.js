import React, { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import SearchBlogs from "./SearchBlogs";
import SingleBlog from "./SingleBlog";
import style from "../styles/blog.module.css";
function Blog() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState("");
  const [posts, setPosts] = useState([]);
  const [interest, setInterest] = useState("");
  const [field, setField] = useState(false);
  const [userId, setUserId] = useState("");
  const [key, setKey] = useState("");

  const handleSearch = (e) => {
    try {
      e.preventDefault();
      axios
        .get(`http://localhost:3001/blog/search?title=${key}`)
        .then((res) => res.data)
        .then((data) => {
          setPosts(data.blogs);
          setResponse(data.msg);
        setUserId(data.userId);

          setTimeout(() => {
            setResponse("");
            setKey("");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setResponse("sorry for inconvinience , try again later");
      setTimeout(() => {
        setResponse(null);
      }, 1000);
    }
  };

  const handleInterestChange = (e) => {
    e.preventDefault();
  
    setInterest(e.target.value);
    setField(true);
  };

  //   let logged =  <div style={{paddingTop:"100px"}}>
  // <h1>blog</h1>
  // </div>
  return (
    <div id={style.mainContainer}>
      <div id={style.searchBlog}>
        <div id={style.responseText}>
          <h1> {response ? response : ""} </h1>
        </div>
        <div id={style.searchAndAddBlog}>
          <div id={style.form}>
            <form id={style.form} onSubmit={handleSearch}>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                type="text"
                placeholder="search by title"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <section id={style.addBlogLink}>
            <NavLink id={style.addBlogText} exact to="/blog/add">
              Add Blog
            </NavLink>
          </section>
        </div>
        <div id={style.searchedBlogs}>
          {posts.map((blog) => (
            <SingleBlog
              key={blog._id}
              blog={blog}
              like={true}
              userId={userId}
            />
          ))}
        </div>
      </div>
      <div id={style.multiBlogLink}>
        <div id={style.links}>
          <button
            className={style.link}
            value="coding"
            onClick={handleInterestChange}
          >
            Coding
          </button>
          <button
            className={style.link}
            value="sports"
            onClick={handleInterestChange}
          >
            Sports
          </button>
          <button
            className={style.link}
            value="cultural"
            onClick={handleInterestChange}
          >
            Cultural
          </button>
          <button
            className={style.link}
            value="technology"
            onClick={handleInterestChange}
          >
            Technology
          </button>
        </div>
        <div id={style.blogs}>
          {field ? <SearchBlogs interest={interest} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Blog;
