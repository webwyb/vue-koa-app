const Router = require('koa-router')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'this is test'
})
module.exports = router
