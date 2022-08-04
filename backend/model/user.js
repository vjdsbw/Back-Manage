const mongoose = require("mongoose");

const newsSchema = new  mongoose.Schema({
email:{
    type:String,
},
img:{
    type:String
},
name:{
    type:String
},
nickname: {
    type: String,
},
password:{
    type:String
},
type:{
	type:String
},
})

const User = mongoose.model("user",newsSchema,"user");
module.exports = User;