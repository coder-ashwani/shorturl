const mongoose = require("mongoose");
const {nanoid} = require("nanoid");

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
        default: () => nanoid(8),
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visithistory:[{ timestamp : {type: Number} }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
    {timestamp :true}
)
const URL = mongoose.model("url",urlSchema);
module.exports = URL;