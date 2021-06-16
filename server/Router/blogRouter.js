const express = require("express");
const router = express.Router();
const Blog = require("../databaseModels/BlogModel");
const User = require("../databaseModels/UserModel");
const authentication = require("../middlewares/authentication");
router.post("/add", authentication, async (req, res) => {
  try {
    const { title, interest, content } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    const addPost = async () => {
      const newBlog = new Blog({
        title,
        interest,
        content,
        authorId: userId,
        authorName: user.name,
        authorEmail: user.email,
        authorSem: user.semester,
      });
      await newBlog.save();
    };
    if ((!title, !interest, !content)) {
      return res.json({ msg: "please enter all fields", added: false });
    }
    await addPost();
    res.status(200).json({ msg: "Added Blog!", added: true });
  } catch (err) {
    res.json({ msg: "Cannot add blog, please try again later", added: false });
  }
});

router.get("/search", authentication, async (req, res) => {
  try {
    let blogs = [];
    // let
    const { title } = req.query;
    let userId = req.userId;
    if (!title) {
      return res.json({
        msg: "please enter title of blog",
        blogs: blogs,
        userId,
      });
    }
    if (title) {
      blogs = await Blog.find({ title });
    }
    if (blogs.length < 1) {
      return res.json({ msg: "Searched blog not found", blogs: blogs, userId });
    }
    res.status(200).json({ msg: "your search results", blogs: blogs, userId });
  } catch (err) {
    let blogs = [];
    res.json({
      msg: "sorry for inconvinience,Try again later",
      blogs: blogs,
      userId,
    });
  }
});

router.post("/find", authentication, async (req, res) => {
  try {
    const { interest } = req.body;
    let blogs = await Blog.find({ interest: interest });
    let userId = req.userId;
    if (blogs.length < 1) {
      return res.json({ msg: "no blogs found", blogs, userId });
    }
    res.json({ msg: "blogs recieved", blogs, userId });
  } catch (err) {
    let blogs = [];
    res.json({
      msg: "sorry for inconvinience ,try again later",
      blogs,
      userId,
    });
  }
});

router.put("/like/:id", async (req, res) => {
  const _id = req.params.id;
  const likes = req.body.likes;
  await Blog.updateOne({ _id }, { $set: { likes } });
  res.json({ msg: "updated like" });
});

router.put("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { title, interest, content } = req.body.blog;

    if ((!title, !interest, !content)) {
      return res.json({ msg: "please enter all fields", added: false });
    }
    const update = await Blog.updateOne(
      { _id },
      { $set: { title, interest, content } }
    );
    console.log(update);
    res.status(200).json({ msg: "Updated Blog!", added: true });
  } catch (err) {
    res.json({ msg: "Cannot add blog, please try again later", added: false });
  }
});

router.delete("/delete:id", async(req, res)=>{
    try {
      const _id = req.params.id;
      await Blog.deleteOne({ _id });
      res.status(200).json({ msg: "Deleted Blog!", added: true });
    } catch (err) {
      res.json({
        msg: "Cannot delete blog, please try again later",
        added: false,
      });
    }

});

module.exports = router;
