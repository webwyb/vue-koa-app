const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
router.get('/', async (ctx) => {
  ctx.body = 'this is home'
})
router.post('/register', async (ctx) => {
  console.log(ctx.request.body)
  // ctx.body = ctx.request.body
  // 取得Model
  const User = mongoose.model('User')
//  获取前端传过来的数据
  let newUser = new User(ctx.request.body)
//  将数据存储到数据库
  await newUser.save().then(() => {
    //  成功返回code = 200
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: '注册成功失败' + error
    }
  })
})
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log('loginUser', loginUser);
  let UserName = loginUser.UserName
  let password = loginUser.password

  const User = mongoose.model('User')
  await User.findOne({ UserName: UserName }).exec()
    .then(async (result) => {
      console.log('我进来了哦😯');
      console.log('result', result);
      if (result) {
        let newUser = new User()
        await newUser.comparePassword(password, result.password)
          .then((isMatch) => {
            console.log('密码是否匹配', isMatch);
            ctx.body = { code: 200, message: isMatch }
          })
          .catch((error) => {
            console.log('发生了错误', error);
            ctx.body = { code: 200, message: error }
          })
      } else {
        ctx.body = { code: 200, message: '用户名不存在' }
      }
    })
    .catch((error) => {
      console.log('老哥进错地放了半');
      ctx.body = { code: 500, message: error }
    })
})
/*登录的实践 */
// router.post('/login', async (ctx) => {
//   //得到前端传递过来的数据
//   let loginUser = ctx.request.body
//   console.log(loginUser)
//   let UserName = loginUser.UserName
//   let password = loginUser.password
//   //引入User的model
//   const User = mongoose.model('User')
//   //查找用户名是否存在，如果存在开始比对密码
//   await User.findOne({ UserName: UserName }).exec().then(async (result) => {
//     console.log(result)
//     if (result) {
//       //console.log(User)
//       //当用户名存在时，开始比对密码
//       let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
//       await newUser.comparePassword(password, result.password)
//         .then((isMatch) => {
//           //返回比对结果
//           ctx.body = { code: 200, message: isMatch }
//         })
//         .catch(error => {
//           //出现异常，返回异常
//           console.log(error)
//           ctx.body = { code: 500, message: error }
//         })
//     } else {
//       ctx.body = { code: 200, message: '用户名不存在' }
//     }
//   }).catch(error => {
//     console.log(error)
//     ctx.body = { code: 500, message: error }
//   })
// })
module.exports = router
