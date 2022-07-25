const express = require("express");
const News = require("../model/news")
const path = require("path")
const mongoose = require("mongoose")
const router = express.Router();


router.get("/snews", async (req, res) => {
   var id = req.query.id;
   let mesa = await News.find();
   res.json({
       code:200,
       message:"获取列表成功",
       data:mesa,
   });
})

// 新增
router.post("/snews/create",async(req,res,next) => {
    try{
        var news = new News(req.body);
        await news.save();
        res.json({
            code:200,
            message:"增加成功",
        });
    } catch (e) {
        next(e);
    }
});

// 删除
router.get("/snews/delete",async(req,res) =>{
    console.log(req.query.num)
   let delnew= await News.deleteOne({ num: req.query.num});
    res.json({
        code:200,
        message:"删除成功",
        delnew
    })
})

//查找新闻详情 /snews/newsList
router.get("/snews/newsList",async(req,res) => {
    let newsexit = await News.find({num:req.query.num});
    res.json({
        code:200,
        message:"查到数据",
        data:newsexit
    })
});

// 编辑
router.post("/snews/exit",async(req,res) => {
    let {type,title,content,num} = req.body;
    News.findOneAndUpdate({num:num},{
        $set: {
            content:content,
            title:title,
            type:type,
        }
    },(err,data) => {
        if(err){
            res.json({
                code:0,
                msg:"修改失败" +err
            })
        }
    })
    res.json({
        code:200,
        msag: "修改成功"
    })
})

// 查找
// router.get("/snews/findNews",async(req,res) =>{
//     // console.log(req.query)
//     let findNew = await News.find({title:req.query.title});
//     console.log(findNew[0])
//     if(findNew.length > 0) {
//         res.json({
//             code:200,
//             message:"查找成功",
//             findNew
//         })
//     }
// })

module.exports = router;