const express = require("express");
const Contact = require("../model/contact");
const router = express.Router();

router.get("/GetContact",async (req,res)=>{
    let result = await Contact.find()
    console.log(result);
    res.json({
        code:200,
        msg:"查找成功",
        data:result[0]
    })
})

module.exports = router;