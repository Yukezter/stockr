const mongoose = require('mongoose')
const { Schema } = mongoose

const TokenSchema = new Schema({
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
    required: true,
    default: Date.now,
    index: { expires: 60 * 60 * 4 }
  }
})

module.exports = Token = mongoose.model('Token', TokenSchema)