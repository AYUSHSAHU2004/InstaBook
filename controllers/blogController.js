const blogModel = require('../models/blogModel')
const userModel = require('../models/userModal')
const mongoose =require("mongoose");
//GET ALL BLOGS
exports.getAllBlogsController = async(req,res)=>{
    try{
        const blogs = await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'no blogs found'
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount:blogs.length,
            message:'all blogs lists',
            blogs,
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:'error while getting blogs',
            error 
        })
    }

}
//CREATE BLOGS
exports.createBlogController = async(req,res)=> {
    try{
        const {title,description,image,user} = req.body
        //validation krenge
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:'please provide all field'
            })
        }//checking prev user
        const existingUser = await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }

        const newBlog = new blogModel({title,description,image,user})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})//newblog ko session ke base pe save krana hai
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction();
        return res.status(201).send({
            success:true,
            message:'Blog Created',
            newBlog,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error while creating blog',
            error,
        })
    }
};
//UPDATE BLOG
exports.updateBlogController = async(req,res)=>{
    try{
        const {id} = req.params
        const {title,description,image} = req.body
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"Blog Updated",
            blog,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error while creating blog',
            error,
        })
    }
}
//SINGLE BLOG
exports.getBlogByIdController = async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'blog not fetched',
                
            })
        }
        return res.status(200).send({
            success:true,
            message:'blog found',
            blog,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error while getting a blog',
            error,
        })
    }
}

exports.deleteBlogController = async(req,res)=>{//deleteing blog on the basis of blog id
    try{
        await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        
        return res.status(200).send({
            success:true,
            message:'blog deleted',
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"problem in deleting blog",
            error,
        })
    }              
}
//GET USERS BLOG
exports.userBlogController = async(req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blogs not found with this id',
            })
        }
        return res.status(200).send({
            success:true,
            message:'user blogs',
            userBlog,
        })
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"not able to fetch userblog",
            error,
        })
    }
}