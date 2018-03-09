const mongoose = require('../db');

let articleSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, '用户名不能为空']
  },
  typeId: {
    type: ObjectId,
    required: [true, '类别Id不能为空']
  },
  typeName: {
    type: String,
    required: [true, '类别名不能为空']
  },
  title: {
    type: String,
    required: [true, '标题不能为空']
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
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
