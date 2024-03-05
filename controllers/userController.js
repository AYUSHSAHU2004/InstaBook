const userModel = require("../models/userModal");
const bcrypt = require('bcrypt');
//create user register user
exports.registerController = async (req,res) => {//isme initially hum empty array of object(blogs)declare krenge..phir jaake baadme ad krdende uss array of object me
        try{
            const{username,email,password} = req.body
            //validation
            if(!username || !email || !password){
                return res.status(400).send({
                    success:false,
                    message:'please fill all the fields'
                })
            }
            //existing user(yahan check krenge email ko yaniki ye existing user hai ki nhi)
            const existingUser = await userModel.findOne({email})
            if(existingUser){
                return res.status(401).send({
                    success:false,
                    message:"user already exists"
                })
            }

            //hashing of password
            const hashedPassword = await bcrypt.hash(password,10); 
            

            //save new user
            const user = new userModel({username,email,password:hashedPassword})
            await user.save()
            return res.status(201).send({
                success:true,
                message:'new User Created',
                user,
            })
        }catch(error){
            console.log(error)
            return res.status(500).send({
                message:'error in register callback',
                success:false,
                error
            })
        }
};


//get all users

exports.getAllusers = async(req,res) => {
    try{
        const users = await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:'all users data',
            users,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in get all users',
            error
        })
    }

};

//login
exports.loginController = async(req,res) => {
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'please provide email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){//if user is not registered then return message not registered
            return res.status(400).send({
                success:false,
                message:"email not registered"
            })
        }//checking wheter password entered is correct
        const pass = await bcrypt.compare(password,user.password)
        if(!pass){
            return res.status(401).send({
                success:false,
                message:'invalid password or username'
            })
        }
        return res.status(200).send({
            success:true,
            message:'login succesfull',
            user
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in login callback',
            error,
        })
    }
};