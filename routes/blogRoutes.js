const express = require("express");
const {getAllBlogsController,createBlogController,updateBlogController,deleteBlogController,getBlogByIdController,userBlogController} = require('../controllers/blogController');
//router object
const router = express.Router()
//GET || ALL BLOGS
router.get('/all-blog',getAllBlogsController);
//POST || create BLOGS
router.post('/create-blog',createBlogController);
//PUT || update BLOGS
router.put('/update-blog/:id',updateBlogController);
//DELETE || delete blog
router.delete('/delete-blog/:id',deleteBlogController);
//GET || SINGLE BLOG DETAILS
router.get('/get-blog/:id',getBlogByIdController);
//GET || USERBLOG
router.get('/user-blog/:id',userBlogController);
module.exports = router;