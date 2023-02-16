
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  projectGrade: { type: String, required: true },
  projectlist: [
    {
      name:String
    }
  ],
  beta: [
    {
      comment: String,
    }
  ],
});

UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next()
})


const User = mongoose.model('User', UserSchema);

module.exports = User;