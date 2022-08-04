
const mongoose = require("mongoose");

const newsSchema = new  mongoose.Schema({
title:{
    type:String
},
time:{
    type:String
},
frequency:{
    type:String
},
content: {
    type: String
},
num:{
    type:String
},

img:{
    type:String 
},
type:{
    type:String  
}
})

const News = mongoose.model("news",newsSchema,"news");


module.exports = News;