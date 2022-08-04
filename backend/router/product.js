
const express = require("express");
const Product = require("../model/product");
const path = require("path");
const multer = require("multer")
const router = express.Router();

// 指定存储位置
const storage = multer.diskStorage({
  // 存储位置
  destination(req, file, callback) {
    // 参数一 错误信息   参数二  上传路径（此处指定public文件夹）
    callback(null, "public/pro-img")
  },
  // 确定文件名
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
// 得到multer对象  传入storage对象
const upload = multer({ storage })


router.post("/getallproduct", async (req, res) => {
  let { current, size } = req.body;
  let result = await Product.find()
  let total = result.length
  const newresult = result.slice((current - 1) * size, (current * size))
  res.json({
    code: 200,
    message: '获取菜单成功',
    data: newresult,
    total: total
  })

})

router.get("/delproduct", async (req, res) => {
  let result = await Product.deleteOne({ id: req.query.id })
  res.json({
    code: 200,
    message: '获取菜单成功',
    data: result + '删除成功'
  })

})

//新增产品
router.post("/addproduct",async(req,res)=>{
    let product = new Product();
    Object.assign(product,req.body);
    product.save();
    res.json({
      msg:"新增成功",
      code:200
    })

})


router.get("/getproductdetail", async (req, res) => {
  
  let result = await Product.find({ id: req.query.id });
  console.log(result,req.query.id);
  if (result.length > 0) {
    res.json({
      data: result,
      code: 200,
      msg: "查找成功"
    })
  }
  else {
    res.json({
      data: result,
      code: 2000,
      msg: "查找失败"
    })
  }
})

//更新产品
router.post("/updateproduct", async (req, res) => {
  let { id,CName, EName, Cas, content, molecularFormula, molecularWeight, img, page } = req.body;
  Product.findOneAndUpdate({ id: id }, {
    $set: {
      CName: CName,
      EName: EName,
      Cas: Cas,
      content: content,
      molecularFormula: molecularFormula,
      molecularWeight: molecularWeight,
      page: page,
      img: img
    }
  }, (err, data) => {
    if (err) {
      res.json({
        code: 2000,
        msg: "更新失败" + err
      })
    }
  })
  res.json({
    code: 200,
    msag: "更新成功"
  })
})

router.post("/uploadPro/upImg",upload.single("file"),(req,res)=>{
  const url = req.file.filename
  res.json({ url })
})

module.exports = router;

