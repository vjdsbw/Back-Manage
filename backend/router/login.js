
const express = require("express");
const vertoken = require('./token');
const User = require("../model/user");
const router = express.Router();

router.post("/login",async (req,res)=>{
  const { userName, password } = req.body;
  let result = await User.find({ name: userName })
  if (userName == result[0].name && password == result[0].password) {
    vertoken.setToken(userName, password).then(token => {
      res.end(JSON.stringify({
        code: 200,
        message: '登录成功',
        data: {
          token: token,
          user:result[0]
        }
      }))
    })
  }
  else {
    res.json({
      code: 400,
      message: '账号密码错误',
    })
  }
})

router.get("/userinfo",(req,res)=>{
  res.json({
    code: 200,
    message: '获取用户信息成功',
    data: {
      id: 1,
      name: req.data.userName,
      role: req.data.userName, // 随机返回一个角色admin或visitor
      avatar: "",
    },
  })
})

module.exports = router

