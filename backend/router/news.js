const express = require("express");
const News = require("../model/news")
const path = require("path")
const mongoose = require("mongoose")
const multer = require("multer")
const router = express.Router();

// 指定存储位置
const storage = multer.diskStorage({
    // 存储位置
    destination(req, file, callback) {
      // 参数一 错误信息   参数二  上传路径（此处指定news文件夹）
      callback(null, "public/news")
    },
    // 确定文件名
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  // 得到multer对象  传入storage对象
  const upload = multer({ storage })

router.get("/snews", async (req, res) => {
    // 后台用?接受的id是string类型，所以对应model里的num的type要改为string
    var id = req.query.id;
    //获得所有的数据，方便snews页面跳转
    let mesa = await News.find();
    // 获得对应id 的num的值
    let mess = await News.find({num:id});
    let mes = mess[0];
    // 将frequency的值加1并存入数据库
    var a = mes.frequency+1;
    News.findOneAndUpdate({ num: id },  { $set: { frequency: a}},{new:true}, (err,data) => {
        if (err) {
            console.log(err);
        }
    })
    res.json({ mes, mesa, id })
})

module.exports = router;