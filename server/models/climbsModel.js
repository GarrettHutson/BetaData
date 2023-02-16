const mongoose = require('mongoose');

const climbSchema = new mongoose.Schema({
    name: String,
    comments: [
        {
            user: String,
            comment: String
        }
    ],
    projecting: [
        {
            user:String
        }
    ]
 
})

const Climb = mongoose.model('Climb', climbSchema);

module.exports = Climb;
