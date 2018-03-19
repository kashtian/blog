const mongoose = require('../db');

let articleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, '用户名不能为空']
  },
  type: {
    type: String,
    required: [true, '文章类型不能为空']
  },
  title: {
    type: String,
    required: [true, '标题不能为空']
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  delta: {
    type: Object,
    required: [true, 'delta不能为空']
  },
  publish: {
    type: Boolean,
    default: false
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('article', articleSchema);
