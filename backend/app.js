const express=require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const product = require("./router/product")
const news = require("./router/news")
const login = require("./router/login")
const menu = require("./router/menu")
const test = require("./router/test")
const contact = require("./router/contact")
const registered = require("./router/registered")
const app=express();
const port=3001;

const vertoken = require('./router/token')
const expressJwt = require('express-jwt').expressjwt

//使用mongoose.connect()方法连接数据库
mongoose.connect("mongodb://localhost/beck");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("已经连接数据库");
});

app.use(expressJwt({
    secret: 'hello_token',
    algorithms: ['HS256']
}).unless({
    //用户第一次登录的时候不需要验证token  [path.resolve(__dirname, 'src/assets/svg')]
    path: ['/login',{url:/^\/public\/.*/,methods:['GET']}]  //不需要验证的接口名称
}))

app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (token == undefined) {
        return next();
    } else {
        vertoken.getToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
});

app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use("/public",express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(product)
app.use(news)
app.use(login)
app.use(menu)
app.use(test)
app.use(registered)
app.use(contact)


app.use(function (err, req, res, next) {
    if (err.status == 401) {
        res.json({ status: 401, message: 'token失效' })
    }
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})


