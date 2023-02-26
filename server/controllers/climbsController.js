const { findOne } = require('../models/climbsModel');
const Climb = require('../models/climbsModel');
const User = require('../models/userModel');

const climbsController = {};

climbsController.getClimbs = async (req, res, next) => {
    const response = await Climb.find({ name: req.params.route });
    res.locals.climbs = response
    next()
}

climbsController.getProjecting = async (req, res, next) => {
    const response = await Climb.find({ name: req.params.route });
    console.log(response)
    res.locals.projecting = response
    next()
}


climbsController.addClimbComment = async (req, res, next) => {
    const user = await User.findOneAndUpdate({ username: req.body.user }, { $push: { beta: { comment: req.body.comment, climb: req.params.climb } } }, { new: true })
    // console.log(user)

    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { $push: { comments: req.body } }, {
            new: true, // Return the updated document instead of the original
            upsert: true, // If a document with the provided name doesn't exist, create a new one
            runValidators: true, // Run validation on updates
        });
        res.locals.comments = document.comments
        res.locals.user = user
        next()
        // }
    } catch (error) {
        console.log(error)
    }
}

climbsController.deleteComment = async (req, res, next) => {
    console.log(req.body.deletedObj.comment)

    const user = await User.findOne({ username: req.body.deletedObj.user })
    console.log(user.beta)
    const newArr = user.beta.filter(obj => obj.comment !== req.body.deletedObj.comment)
    console.log(newArr)

    const newUser = await User.findOneAndUpdate({ username: req.body.deletedObj.user }, { beta: newArr }, { new: true })
    console.log(newUser.beta)
    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { comments: req.body.comments }, {
            new: true, // Return the updated document instead of the original 
        });
        res.locals.deleted = document.comments
        res.locals.user = newUser
        next()
    } catch (error) {
        console.log(error)
    }
}

climbsController.addProjecting = async (req, res, next) => {
    let userDocument = await User.findOne(
        {
            name: req.body.user,
            projectlist: { $elemMatch: { name: req.params.climb } }
        }).exec();
    console.log('user when they dobnt have the climb in their array', userDocument)
    let user
    if (userDocument === null) {
        user = await User.findOneAndUpdate(
            { username: req.body.user },
            // { projectlist:[{name:req.params.climb}]},
            { $push: { projectlist: { name: req.params.climb } } },
            { new: true })
        console.log("user after adding climb to rojecting list", user)
    }
    try {
        let document = await Climb.findOne(
            {
                name: req.params.climb,
                projecting: { $elemMatch: { user: req.body.user } }

            })
        if (document) {
            // User already exists in the array, do not add again
            res.locals.projecting = document.projecting;

            res.locals.user = userDocument
            return next();
        }


        console.log('found user with climb in project list  ', userDocument)
        const updatedDocument = await Climb.findOneAndUpdate(
            { name: req.params.climb },
            { $push: { projecting: req.body } },
            { new: true, upsert: true, setDefaultsOnInsert: true } 
        )
        res.locals.projecting = updatedDocument.projecting;
        res.locals.user = user
        return next();
    } catch (error) {
        console.log(error)
    }



}
climbsController.deleteProjecting = async (req, res, next) => {
    let usesrDocument = await User.findOne(
        {
            name: req.body.user,
            projectlist: { $elemMatch: { name: req.params.climb } }

        });
    let user;
    if (usesrDocument) {
        const newArr = usesrDocument.projectlist.filter(obj => obj.name !== req.params.climb)


        user = await User.findOneAndUpdate(
            { username: req.body.user },
            // { projectlist:[{name:req.params.climb}]},
            { projectlist: newArr },
            { new: true })
    }

    try {
        let document = await Climb.findOneAndUpdate({ name: req.params.climb }, { projecting: req.body.projecting }, {
            new: true, // Return the updated document instead of the original 
        });
        res.locals.deleted = document.projecting
        res.locals.user = user;
        return next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = climbsController;


