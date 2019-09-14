const express= require('express');
const PostsModel = require ('./posts.models');
const postRouter=express.Router();
const UsersModel = require('../users/users.models');
postRouter.post(`/create`, async (req, res) => {
    try {
        if(!req.session.currentUser || !req.session.currentUser._id)  {res.status(400).json({
            success:false,
            message: 'chua dang nhap'
        })}
        else {
            const newPost = await PostsModel.create({
                content: req.body.content,
                imageUrl: req.body.imageUrl,
                author: req.session.currentUser._id,
            });
            console.log('da dang nhap',req.session);
            res.status(200).json({
                success: true,
                message: 'able to create',
                data:newPost,
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        }
        );
    }
});

postRouter.get(`/get/:postId`, (req, res) => {
    
       PostsModel.findById(req.params.postId).populate('author','email fullName').exec((error,data)=>{
        if(error)
      {
         res.status(500).json({
             success: false,
             message: error.message,
         }
         );
     }
     else {
         res.status(200).json({
             success: true,
             message: "okay",
             data: data,
         })}
    })
});




module.exports= postRouter;


