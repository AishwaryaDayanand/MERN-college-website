const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  interest:String,
  content: String,
  likes:{
    type:Number,
    default:0
  },
  authorId:String,
  authorName : String,
  authorEmail:String,
  authorSem:Number
});

//collection creation -- model
const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;