const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')
let test = require('./appApi/test.js')
let goods = require('./appApi/goods.js')

// 装在路由
let router = new Router()
router.use('/user', user.routes())
router.use('/test', test.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


// 立即执行
;
(async () => {
  await connect()
  initSchemas()
  // const User = mongoose.model('User')
  // let oneUser = new User({ UserName: Math.random(), password: '123456' })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })
  // // 查找
  // let users = await User.find({}).exec()
  // console.log('------------------')
  // console.log(users)
  // console.log('------------------')
})()

// app.use(async (ctx) => {
//   ctx.body = '<h1> hello koa </h1>'
// })

app.listen(3000, () => {
  console.log('app is work')
})
