const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const Message = require("./databaseModels/MessageModel");
const userRouter = require("./Router/userRouter");
const blogRouter = require("./Router/blogRouter");
const cookie_parser = require("cookie-parser");
const authentication = require("./middlewares/authentication");

//MONGODB ATLAS CONNECTION
// let db =
//   "mongodb+srv://<username>:"+ encodeURIComponent(<password>) +"@cluster0.nsmkc.mongodb.net/college?retryWrites=true&w=majority";

//middlewares needed
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

//atlas connection
// mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
// .then(()=>console.log("connected to atlas"))
// .catch((err)=>console.log(err))

//database connenction
mongoose
  .connect("mongodb://localhost:27017/college", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection successful..."))
  .catch((err) => console.log(err));

//function to create message in db, accept argument as post
const createMessage = async (post) => {
  try {
    const newMessage = new Message({
      name: post.name,
      message: post.message,
    });
    const res = await newMessage.save();
    return "success";
  } catch (err) {
    return err;
  }
};

//post request sending message
app.post("/contact", authentication, (req, res) => {
  try {
    let post = req.body;
    if (!post.name || !post.message) {
      return res.json({ msg: "Please fill all details." });
    }
    createMessage(post);
    res.json({ msg: "Your message has bees Recieved." });
  } catch (err) {
    console.error(err);
    res.json({ msg: "sorry, try again" });
  }
});

app.get("*", (req, res) => {
  res.send("page does not exisr");
});
app.post("*", (req, res) => {
  res.send("page does not exisr");
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
