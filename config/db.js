//jaldi se mongoose import krdete hain or iske madad se connection establish kr dete hain
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoose database on ${mongoose.connection.host}`.bgGreen.white);
    }catch(err){
        console.log(`MONGO error ${err}`.bgRed.white);
    }
}

module.exports = connectDB;