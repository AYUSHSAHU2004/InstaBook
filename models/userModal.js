const mongoose = require("mongoose");
//ham scema ke madad se bhi design krte hain jese  ham sql me krte the kesa type hoga kesa design hoga
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'username is must']
    },
    email:{
        type:String,
        require:[true,'email is must']
    },
    password:{
        type:String,
        require:[true,'password is must']
    },//maintaing rekation between user and blog
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog',
        }
    ],
    

   
},{timestamps:true});//timestamps:true hamko time bata ta hai ki kab user jo hai create hua hai
const userModel = mongoose.model('user',userSchema);
module.exports = userModel;