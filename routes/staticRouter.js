const express = require("express");
// const { route } = require("./url");
const URL = require("../models/url")
const router=  express.Router();

router.get("/",async(req,res)=>{
    const allurls = await URL.find({})
    return res.render("home",{
        urls : allurls,
    })
})

router.get("/signup",async(req,res)=>{
    console.log(req);
    return res.render("signup");
})

router.get("/login",async(req,res)=>{
    console.log(req);
    return res.render("login");
})



module.exports = router;