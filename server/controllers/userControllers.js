const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const userController = {

    async signUp (req,res,next){
        const {username, password} = req.body;
        if(!username || !password) (err)=>next(err);
        const user =  new User({
            username: req.body.username,
            password: req.body.password,
            projectGrade: req.body.projectGrade
        }); 
        user.save()
       next()
    },

    async getUsers(req,res,next){
        try{
            const users = await User.find()
            res.locals.users = users;
            next()
        }
        catch{
            next({error: "all users fetch failed"})
        }
    },
    async login(req,res,next){
        const {username, password} = req.body;
        const user = await User.findOne({username: username})
 
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            res.locals.user = user;
            next();
        }else{
            next({error:"try again"})
        }

   
    }

}




module.exports = userController;