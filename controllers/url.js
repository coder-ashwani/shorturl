const {nanoid} = require("nanoid");
const URL = require("../models/url")

//
async function Handlegenerateshorturl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    
    const ShortID= nanoid(7);
    // console.log(ShortID);

    await URL.create({
        shortID : ShortID,
        redirectURL : body.url,
        visithistory:[],
        createdBy: req.user._id,
    })

    // console.log("reaches");
    return res.render("home",{
        id:ShortID,
    })// this data is goning to home ejs file
    // return res.json({ id:ShortID });
}

//for getting analytics of a website
async function HandlegetAnalytics(req,res) {
    const shortID = req.params.shortId; 
    // if(!shortID) return res.json({shortID: "shortid is not valid"})  
    const result = await URL.findOne({shortID});
    if (!result) {
        return res.status(404).json({ error: "No record found for the provided shortID" });
    }

    return res.status(200).json({totalClicks :result.visithistory.length,
        Redirecturl: result.redirectURL,
        analytics : result.visithistory})
}


module.exports = {
    Handlegenerateshorturl,
    HandlegetAnalytics
}    