const mongoose = require("mongoose");

//document schema


const messageSchema = mongoose.Schema({
    name: String,
    message: String,
});

//collection creation -- model 
const Message = new mongoose.model("Message", messageSchema);

module.exports= Message