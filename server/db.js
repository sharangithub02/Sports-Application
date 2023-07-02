const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()

const ConnectToMongo = async () => {
    try{
        await mongoose.connect(process.env.MongoURI)
        console.log("Connect to Mongo Successfull")
    }
    catch(err){
        console.log("Connect to Mongo Unsuccessfull ", err)
    }
}

module.exports= ConnectToMongo