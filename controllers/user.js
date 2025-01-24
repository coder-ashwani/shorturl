const User = require("../models/user");
const {v4 : uuidv4}  = require("uuid")
const user = require("../models/user")
const { setUser } = require("../service/auth") 

async function handleUserSignup(req,res){
    const {name,email ,password}  = req.body;
    await User.create({
        name,email,password,
    })
    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const {email ,password}  = req.body;
    const user  = await User.findOne({email,password});
    console.log(user);
    if(!user){
        return res.render("login",
            {
                error:"Invalid email or password",
            }
        )
    }
    const sessionId = uuidv4();
    // const  token = setUser(user)
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/")
}

module.exports = {
    handleUserSignup,handleUserLogin
}