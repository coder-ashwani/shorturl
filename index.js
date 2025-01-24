const express = require("express")
const app = express();
const path =require("path");
const PORT= 8001;
const urlroute = require("./routes/url")
const cookieParser = require("cookie-parser")
const URL =require("./models/url")
const staticRoute = require("./routes/staticRouter")
const {Connecttomongodb}  =require("./connect")
const userRoute = require("./routes/user")
const {restrictToLoggedInUserOnly} = require("./middlewares/auth");

Connecttomongodb('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("Mongodb connected")
}); //db name - short-url

app.use(express.json()) //middleware for accepting json response 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser);

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.get("/testing/test",async(req,res)=>{
    const allurls = await URL.find({})
    return res.render('home',{
        urls:allurls
    });
})
//ex of SSR

app.use("/",staticRoute);
app.use("/url",restrictToLoggedInUserOnly,urlroute); //inline middleware
app.use("/user", userRoute);
//routing ke liye hai

app.get("/",(req,res)=>{
    res.send("Welcome to short url")
})

app.get('/:shortId',async(req,res) => {
        const shortID = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortID
        },
        { $push :{
            visithistory:{
                timestamp : Date.now(),
            }
            
        }})
        if (!entry) {
            return res.status(404).send({ error: "Short ID not found" });
        }
        res.redirect(entry.redirectURL);
});


const server = app.listen(PORT,()=>{ console.log(`server started at :8001`) });
server.timeout =10000; //10 sec
 


