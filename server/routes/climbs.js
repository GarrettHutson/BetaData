const express = require('express');

const climbsController = require('../controllers/climbsController')

const router = express.Router();

router.get('/getAll/:route',
climbsController.getClimbs,
(req,res,next) => {
   res.status(200).json(res.locals.climbs)
}
)

router.patch('/deleteComment/:climb',
climbsController.deleteComment,
(req,res,next) => {
    res.status(200).json(res.locals.deleted)
}
)



router.patch('/deleteProjecting/:climb',
climbsController.deleteProjecting,
(req,res,next) => {
    res.status(200).json(res.locals.deleted)
}
)



router.patch('/addProjecting/:climb',
climbsController.addProjecting,
(req,res,next) => {
    res.status(200).json(res.locals.projecting)
}
)

router.post('/:climb',
climbsController.addClimbComment,
(req,res,next) => {
    const comments = res.locals.comments;
    res.status(200).json(comments)
}
)

module.exports = router;