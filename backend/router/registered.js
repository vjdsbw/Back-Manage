const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user")
const router = express.Router();


router.post("/registered", async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        //根据email和nickname从数据库查询邮箱或者用户名是否已存在
        let findUser = await User.findOne({ $or: [{ email }, { name }] })
        //如果存在，则返回错误信息
        if (findUser) {
            res.json({
                code: 200,
                message: "用户名或者邮箱已经存在"
            })
        }
        //如果不存在，则保存用户信息，注册成功，并跳转登录页面
        else {
            //保存用户
            let user = new User(req.body);
            await user.save()                               //调用save保存数据
            res.json({
                code: 400,
                message: "注册成功"
            })
        }
    }
    catch (err) {
        next(err)
    }
    
})
module.exports = router;