const express = require('express');

const userController = require('../controllers/userControllers')

const router = express.Router();

router.post('/signup', userController.signUp, (req,res,next) => {
    res.status(200).send("user added")
})


router.get('/', userController.getUsers, (req,res,)=>{
  res.status(200).json(res.locals.users)
 })

 router.post('/login', userController.login,(req,res,next) => {
    res.status(200).json(res.locals.user)
 })

module.exports = router;