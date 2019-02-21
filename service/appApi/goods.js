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
module.exports = router;
