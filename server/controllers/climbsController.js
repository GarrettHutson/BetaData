const { findOne } = require('../models/climbsModel');
const Climb = require('../models/climbsModel');
const User = require('../models/userModel');

const climbsController = {};

climbsController.getClimbs = async (req, res, next) => {
    const response = await Climb.find({ name: req.params.route });
    res.locals.climbs = response
    next()
}

climbsController.addClimbComment = async (req, res, next) => {
const user = await User.findOneAndUpdate({username:req.body.user}, {$push : {beta:{comment:req.body.comment}}},{new:true})
// console.log(user)

    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { $push: { comments: req.body } }, {
            new: true, // Return the updated document instead of the original
            upsert: true, // If a document with the provided name doesn't exist, create a new one
            runValidators: true, // Run validation on updates
        });
        res.locals.comments = document.comments
        next()
        // }
    } catch (error) {
        console.log(error)
    }
}

climbsController.deleteComment = async (req, res, next) => {
    console.log(req.body.deletedObj.comment)

const user = await User.findOne({username:req.body.deletedObj.user})
console.log(user.beta)
const newArr = user.beta.filter(obj=> obj.comment !== req.body.deletedObj.comment)
console.log(newArr)

        const newUser =await User.findOneAndUpdate({username:req.body.deletedObj.user}, {beta:newArr},{new:true})
        console.log(newUser.beta)
    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { comments: req.body.comments }, {
            new: true, // Return the updated document instead of the original 
        });
        res.locals.deleted = document.comments
        next()
    } catch (error) {
        console.log(error)
    }
}

climbsController.addProjecting = async (req, res, next) => {
    let usesrDocument = await User.findOne(
        { name: req.body.user ,
        projectlist: {$elemMatch: { name: req.params.climb } }
      
        });
        if(!usesrDocument){
            const user = await  User.findOneAndUpdate( 
                {username:req.body.user},
                // { projectlist:[{name:req.params.climb}]},
                {$push : {projectlist:{name:req.params.climb}}},
                {new:true})
        
        }
    try {
        let document = await Climb.findOne(
            { name: req.params.climb ,
            projecting: {$elemMatch: { user: req.body.user } }
          
            });
        // res.locals.projecting = document.projecting
        // next()

        if (document) {
            // User already exists in the array, do not add again
            res.locals.projecting = document.projecting;
            next();
            return;
        }

        const updatedDocument = await Climb.findOneAndUpdate(
            { name: req.params.climb },
            { $push: { projecting: req.body } },
            { new: true } // Return the updated document instead of the original 
        );
        res.locals.projecting = updatedDocument.projecting;
        next();

    } catch (error) {
        console.log(error)
    }


    
}
climbsController.deleteProjecting = async (req, res, next) => {
    let usesrDocument = await User.findOne(
        { name: req.body.user ,
        projectlist: {$elemMatch: { name: req.params.climb } }
      
        });
        console.log(usesrDocument)
        if(usesrDocument){
                const newArr = usesrDocument.projectlist.filter(obj => obj.name !== req.params.climb)


            const user = await  User.findOneAndUpdate(
                {username:req.body.user},
                // { projectlist:[{name:req.params.climb}]},
                {projectlist:newArr},
                {new:true})
        console.log(user)
        }

    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { projecting: req.body.projecting }, {
            new: true, // Return the updated document instead of the original 
        });
        res.locals.deleted = document.projecting
        next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = climbsController;


