const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressSession=require(`express-session`);
const usersRouter = require('./users/users.routes');
const UserModel = require('./users/users.models');
mongoose.connect(`mongodb://localhost:27017/techkids-hotgirls`, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error);
        process.exit();
    }
    else {
        console.log("Connected to mongodb");
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials","true");
            res.header("Access-Control-Allow-Headers", "Origin, X-requested-With , Content-Type, Accept");
            next();
        });
        app.use(bodyParser.json());
        app.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
  saveUninitialized: true
          }))
        app.use('/users',usersRouter);
        
        app.listen(3001, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Server listen on port 3001....');
            }
        });
    }
})