const express = require("express")
const {Handlegenerateshorturl,HandlegetAnalytics} =  require("../controllers/url")
const router=  express.Router();

router.post("/",Handlegenerateshorturl);
// router.get("/",()=>{
//     console.log("working fine");
// })
router.get("/analytics/:shortId",HandlegetAnalytics )
module.exports=router;  //exporting the router to use in index.js file.  //