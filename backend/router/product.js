const express = require("express");
const Product = require("../model/product");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/product", async (req, res) => {
  const { pageindex = 1 } = req.query;
  var limit = 9;
  //如果a标签返回的值有page
  if (req.query.page) {
    var skip = (pageindex - 1) * limit;
    let result = await Product.find({ page: req.query.page }).skip(skip).limit(limit);
    let result2 = await Product.aggregate([
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
        },
      },
    ]);
    var page1 = req.query.page;
    // 根据page的不同类计算总页数
    switch (req.query.page) {
      case 'sh': totalPage = Math.ceil(result2[2].count / limit); break;
      case 'yy': totalPage = Math.ceil(result2[1].count / limit); break;
      case 'cl': totalPage = Math.ceil(result2[0].count / limit); break;
    }
    //console.log(totalPage);
    res.json({
      products: result,
      totalPage: totalPage,
      page1
    });
  }
  else {
    var skip = (pageindex - 1) * limit;
    let result = await Product.find().skip(skip).limit(limit);
    let result2 = await Product.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    var totalPage = Math.ceil(result2[0].count / limit);
    res.json({
      products: result,
      totalPage: totalPage,
    });
  }
});


router.get("/product2", async (req, res) => {
  var images = await Product.find({ id: req.query.id });
  var imagesp = await Product.find({ id: req.query.id - 1 });
  // 因为req.query获得的返回值是字符串，直接加就变成了字符串拼接，这里减负值就会强制转换为number
  var imagesa = await Product.find({ id: req.query.id - (-1) });
  var image = images[0];
  var imagep = imagesp[0];
  var imagea = imagesa[0];
  res.json({ image, imagep, imagea });
});

module.exports = router;
