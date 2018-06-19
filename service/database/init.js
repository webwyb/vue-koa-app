const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost/Vuekoa'

mongoose.Promise = global.Promise

exports.connect = () => {
  // 连接
  mongoose.connect(db)
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    // 增加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出错')
      }
    })

    // 连接出错
    mongoose.connection.on('error', (error) => {
      console.log(error)
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出错')
      }
    })
    //   连接打开
    mongoose.connection.once('open', () => {
      console.log('Mongodb connect success')
      resolve()
    })
  })
}
// 引入schema 下的所有js 文件
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
