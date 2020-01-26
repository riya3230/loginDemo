const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  role:{
    type:String,
  }
})

const user = mongoose.model('user', userSchema);

module.exports = user;