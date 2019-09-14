const express = require('express');
const multer = require('multer');
const uploadRouter = express.Router();
const fs=require('fs');
const multerStorage = multer({
    dest: 'public/',
});
uploadRouter.post('/photos', multerStorage.single('image'), (req, res) => {
    console.log('req file backend ne',req.file);

    // rename
    const fileExt = req.file.originalname.split('.');
    const ext = fileExt[fileExt.length - 1];
    fs.rename(req.file.path, `public/${req.file.filename}.${ext}`,(error)=>{
           
        
        
        
        if(error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
            else {
                res.status(201).json({
                    success: true,
                    message:' okekokee',
                    data: {
                        imageUrl:`http://localhost:3001/${req.file.filename}.${ext}`
                    }
                })
            }
    });

    // return url
    
});
module.exports = uploadRouter;