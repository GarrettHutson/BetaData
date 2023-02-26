const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// const { findOneAndUpdate } = require('../models/userModel');

const userController = {

    async signUp (req,res,next){
        const {username, password} = req.body;
        if(!username || !password) (err)=>next(err);
        const user = await  new User({
            username: req.body.username,
            password: req.body.password,
            projectGrade: req.body.projectGrade
        }); 
        user.save()
        res.locals.user = user
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

   
    },

    async bookmark(req,res,next){
        const currUser = await User.findOne(
            {username: req.body.user})
            console.log('curruser',currUser)
        const check = currUser.bookmarkedBeta.filter(obj=> obj.comment === req.body.comment)
           console.log('check',check)
            if(check.length === 0){

            
                const user = await User.findOneAndUpdate(
                    {username: req.body.user},
                    {$push: {bookmarkedBeta: {climb: req.body.climb, author: req.body.author, comment: req.body.comment}}},
                    {new:true}
                )
                console.log('updated',user)
                res.locals.user = user
                return next()
            }
     
       next()
}
      

}




module.exports = userController;