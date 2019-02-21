const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
// 创建userSchema
const userSchema = new Schema({
  UserId: ObjectId,
  UserName: { type: String, unique: true },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLogin: { type: Date, default: Date.now() }
})
// 每次存储数据时都要执行
userSchema.pre('save', function (next) {
  // let user = this
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})
// 将客户端输入的密码和数据库中的密码比对
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

mongoose.model('User', userSchema)
