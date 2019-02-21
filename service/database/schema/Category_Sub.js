/**
 * Created by wuyanbin on 2019/2/21.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySubSchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_NAME: { type: String },
  IMAGE: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
}, {
  collection: 'Category_Sub'
})

mongoose.model('Category_Sub', categorySubSchema)
