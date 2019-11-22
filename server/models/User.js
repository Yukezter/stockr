const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  active: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = User = mongoose.model('User', userSchema)