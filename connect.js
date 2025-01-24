const mongoose = require("mongoose");

async function Connecttomongodb(url) {
    return mongoose.connect(url);
}

module.exports ={
    Connecttomongodb
} 