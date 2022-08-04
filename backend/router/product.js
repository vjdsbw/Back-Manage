const express = require("express");
const Product = require("../model/product");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/getallproduct", async (req, res) => {
   let  {current, size} = req.body;
   let result=await Product.find()
   let total = result.length
   const newresult = result.slice((current-1)*size,(current*size))
   res.json({ 
    code:200,
    message: '获取菜单成功',
    data:newresult,
    total:total
   })

})

router.get("/delproduct", async (req, res) => {
   console.log(req.query);
   // let result=await Product.find()
   let result = await Product.deleteOne({id:req.query.id})
   res.json({ 
    code:200,
    message: '获取菜单成功',
     data:result+'删除成功'
   })

})

module.exports = router;
