const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')

// 立即执行
;
(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({ UserName: 'wuyanbin006', password: '121212' })
  oneUser.save().then(() => {
    console.log('插入成功')
  })
  // 查找
  let users = await User.findOne({}).exec()
  console.log('------------------')
  console.log(users)
  console.log('------------------')
})()

app.use(async (ctx) => {
  ctx.body = '<h1> hello koa </h1>'
})

app.listen(3000, () => {
  console.log('app is work')
})
