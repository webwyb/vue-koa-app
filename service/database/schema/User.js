const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId: ObjectId,
  UserName: { type: String, unique: true },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLogin: { type: Date, default: Date.now() }
})

mongoose.model('User', userSchema)
