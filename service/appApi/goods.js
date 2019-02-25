/**
 * Created by wuyanbin on 2019/2/21.
 */

const Koa = require('Koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')
// 所有商品信息
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
    if (data) {
      console.log('开始读取数据', data);
      data = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods');
      data.RECORDS.map((value, index) => {
        console.log(value);
        let newGoods = new Goods(value);
        newGoods.save().then(() => {
          saveCount++;
          console.log('成功' + saveCount);
        }).catch((error) => {
          console.log('失败', +error);
        })
      })
    } else {
      console.log('读取数据出错', err);
    }
  })
  ctx.body = '开始倒入数据'
})
// 所有商品种类信息
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    console.log('------', Category);
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount);
      }).catch((error) => {
        console.log('失败' + error);
      })
    })
  })
})
// 所有商品子类信息
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('Category_Sub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('保存成功' + saveCount);
      }).catch((error) => {
        console.log('失败' + error);
      })
    })
  })
})
// 获取商品详情接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    const result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (error) {
    console.log('获取商品详情接口error', error);
    ctx.body = { code: 500, message: error }
  }
  // let goodsId = ctx.request.body.goodsId
  // const Goods = mongoose.model('Goods')
  // await Goods.findOne({ ID: goodsId }).exec()
  //   .then(async (result) => {
  //     ctx.body = { code: 200, message: result }
  //   })
  //   .catch(error => {
  //     console.log('获取商品详情接口error',error);
  //     ctx.body = { code: 500, message: error }
  //   })
})
// 获取商品大类
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    console.log('查询到的结果', result);
    ctx.body = { code: 200, message: result }
  } catch (e) {
    ctx.body = { code: 500, message: e }
  }
})
// 获取小类别的接口
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    // let categoryId = '1'
    const CategorySub = mongoose.model('Category_Sub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (e) {
    ctx.body = { code: 500, message: e }
  }
})
//根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categoryId
    let page = ctx.request.body.page
    let num = 3
    let start = (page - 1) * num
    // let categorySubId = '1'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({ SUB_ID: categorySubId })
      .skip(start).limit(num).exec()
    ctx.body = { code: 200, message: result }
  } catch (e) {
    ctx.body = { code: 500, message: e }
  }


})
module.exports = router;
