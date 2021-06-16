import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleBlog from "./SingleBlog";
function SearchBlogs(props) {
  const interest = props.interest;
  const [like, setLike] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getBlogs();
    return () => {
      setBlogs([]);
      setResponse(null);
      setLike(null);
    };
  }, [interest, like]);
  function getBlogs() {
    axios
      .post("http://localhost:3001/blog/find", { interest })
      .then((res) => {
        setBlogs(res.data.blogs);
        setResponse(res.data.msg);
        setUserId(res.data.userId);
        setTimeout(() => {
          setResponse(null);
        }, 1000);
      })
      .catch((err) => {
        setResponse(err);
        setTimeout(() => {
          setResponse(null);
        }, 1000);
      });
  }
  const updateLikes = (event, _id, currentLikes) => {
    event.preventDefault();
    console.log("liked");
    axios
      .put(`http://localhost:3001/blog/like/${_id}`, {
        likes: currentLikes + 1,
      })
      .then((res) => {
        // console.log(res.data.msg);
        getBlogs();
      });
  };
  return (
    <div>
      {blogs.map((blog) => (
        <SingleBlog key={blog._id} blog={blog} updateLikes={updateLikes} userId={userId} getBlogs={getBlogs} />
      ))}
    </div>
  );
}

export default SearchBlogs;
