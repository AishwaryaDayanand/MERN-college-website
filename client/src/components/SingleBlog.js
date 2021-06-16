import React,{useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../styles/singleBlog.module.css";
import afterLike from "../images/interest.svg";
import beforeLike from "../images/beforeLike.svg";
import AddBlog from "../components/AddBlog";
import updateImg from "../images/updateImg.svg";
import deleteImg from '../images/delete.svg'
function SingleBlog({ blog, updateLikes, like, userId,getBlogs }) {
   const [response, setResponse] = useState("");

  const deleteHandler = async (e)=>{
      e.preventDefault();
    if( window.confirm(`Delete ${blog.title}`)){
    const res =  await axios.delete(`http://localhost:3001/blog/delete${blog._id}`);
        getBlogs();
    }
     

  }
  return (
    <div>
      <div key={blog._id} id={style.blogContainer}>
        <div id={style.heading}>
          <h2 id={style.title}>
            {blog.title[0].toUpperCase() + blog.title.substring(1)}
          </h2>
          <div id={style.Icons} >
            {!like ? (
              <div id={style.likeBtn}>
                <img
                  id="likeImg"
                  src={beforeLike}
                  alt="likes"
                  onClick={(event) => {
                    updateLikes(event, blog._id, blog.likes);
                  }}
                />
                <h4 id={style.likeText}>{blog.likes} Likes </h4>
              </div>
            ) : (
              ""
            )}
            <h1>
              {" "}
              {blog.authorId === userId ? (
                <Link
                  to={{
                    pathname: "/blog/update",
                    blog: {
                      blog: blog,
                    },
                  }}
                >
                  <img src={updateImg} alt="update" />
                </Link>
              ) : (
                ""
              )}
            </h1>
            <img onClick={deleteHandler} src={deleteImg} alt="update" />
          </div>
        </div>
        <div id={style.content}>
          <p>{blog.content[0].toUpperCase() + blog.content.substring(1)}</p>
          <div id={style.authorDetails}>
            <h6 id={style.authorHeading}> Author </h6>
            <h5>
              {blog.authorName[0].toUpperCase() + blog.authorName.substring(1)}{" "}
              , {blog.authorSem}th Semester
            </h5>

            <h6>{blog.authorEmail}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
