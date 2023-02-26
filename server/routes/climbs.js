const express = require('express');

const climbsController = require('../controllers/climbsController')

const router = express.Router();

router.get('/getAll/:route',
climbsController.getClimbs,
(req,res,next) => {
   res.status(200).json(res.locals.climbs)
}
)
router.get('/getProjecting/:route',
climbsController.getProjecting,
(req,res,next) => {
   res.status(200).json(res.locals.projecting)
}
)
router.patch('/deleteComment/:climb',
climbsController.deleteComment,
(req,res,next) => {
    const deleted = res.locals.deleted
    const user = res.locals.user
    res.status(200).json({deleted:deleted, user:user})
}
)



router.patch('/deleteProjecting/:climb',
climbsController.deleteProjecting,
(req,res,next) => {
const deleted = res.locals.deleted;
const user = res.locals.user
    res.status(200).json({deleted:deleted, user:user})
}
)



router.patch('/addProjecting/:climb',
climbsController.addProjecting,
(req,res,next) => {


    const projecting = res.locals.projecting
    const user = res.locals.user
   
   
    res.status(200).json({projecting: projecting, user:user})
}
)

router.post('/:climb',
climbsController.addClimbComment,
(req,res,next) => {
    const comments = res.locals.comments;
    const user = res.locals.user
    res.status(200).json({comments:comments,user:user})
}
)

module.exports = router;