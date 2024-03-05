const express = require("express");
//iske madad se ham routing object create kr sakte hain 
const {getAllusers,registerController,loginController} = require("../controllers/userController");

const Router = express.Router();
//GET ALL USERS || GET
Router.get('/all-users',getAllusers);
//CREATE USER ||POST
Router.post('/register',registerController);
//LOGIN || POST
Router.post('/login',loginController);

module.exports = Router; 