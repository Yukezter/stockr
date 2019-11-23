const mongoose = require('mongoose')
const { Schema } = mongoose

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  date: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  }
})

module.exports = Token = mongoose.model('Token', tokenSchema)