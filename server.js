const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); //morgan ke wajah se jab bhi request send hota hai hamare server ko to pata chal jata hai console pe ki kesa request hai kitna time laga and status kya hai
const colors = require("colors");//console ko colors desakte
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();


const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
// basic midleware ko bhi daaldenge
//rest object
connectDB();
const app = express();//app me express ki jitni functionalities hai usse add krdenge
//import router

app.use(cors());
app.use(express.json());//isse kya hoga ki ham client se json data bhi recieve krsakte hain
app.use(morgan('dev'));//jo bhi url pe hit hoga wo console pe show hoga

//Port
const Port = process.env.PORT || 8080
const DEV_MODE  = process.env.DEV_MODE
//routes create krenge

/*app.get('/',(req,res)=>{
    res.status(200).send({
        "message":"node server"
    })
}) in place of this we are going to use middle wares*/

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/blog',blogRoutes);
//app ko listen krenge

app.listen(Port,()=>{
    console.log(`server is working on ${DEV_MODE} mode on port: ${Port}`.bgCyan);
})
