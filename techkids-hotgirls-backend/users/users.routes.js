const express = require(`express`);
const UsersModel = require('./users.models');
const usersRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const bcryptjs = require(`bcryptjs`);
const expressSession=require(`express-session`);
usersRouter.post('/register', async (req, res) => {


    // validate email

    try {
        if (!emailRegex.test(req.body.email)) {
            res.statusMessage(400).json({
                success: false,
                message: 'Invalid email adress',
            });



        }
        // validate password
        else
        if (req.body.repeatPass !== req.body.password) {
            res.status(400).json({
                success: false,
                message: `Password and Repeat Password don't match`,
            });
        }
        else
        if (req.body.password.length < 6) {
            res.status(400).json({
                success: false,
                message: 'Password must be more than 6 characters',
            });
        }
        // email exist? 
        else {
            const data = await UsersModel.findOne({ email: req.body.email }).lean();
            if (data) {
                res.status(400).json({
                    success: false,
                    message: 'Email has been used'
                });
            }
            else {
                //hash pw
                const hasPassword = bcryptjs.hashSync(req.body.password, 10);
                console.log('pass ne ', hasPassword);




                //create user record

                const newUser = await UsersModel.create({
                    email: req.body.email,
                    password: hasPassword,
                    fullName: req.body.fullName
                });
                res.status(201).json({
                    success: true,
                    data: newUser,
                });
                console.log(UsersModel.model);




            }





        }



    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }









});

usersRouter.post(`/login`, async (req, res) => {
    try {
        const user = await UsersModel.findOne({
            email: req.body.email
        }).lean();
        if (!user) {
            res.status(400).json({
                success: false,
                message: `Email doesn't exist`
            });
        }
        else {
            console.log(user);
            console.log(user.password);
            
            if (bcryptjs.compareSync(req.body.password,user.password)) {
                req.session.currentUser={
                    email: user.email,
                    _id: user._id
                };
                console.log('session day ',req.session.currentUser);
                res.status(200).json({
                    success: true,
                    message: `Login success`
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Wrong Password`
                });
            }
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

usersRouter.get('/logout',(req,res)=>{
    req.session.destroy();
    res.status(200).json({
        success: true,
        message: 'Log out success',
    });
    window.location.href='/users/login'
});

usersRouter.get('/current-user',(req,res) => {
    console.log('session final',req.session);
    res.json({
        success:true,
        data: req.session,
    });
})
module.exports = usersRouter;