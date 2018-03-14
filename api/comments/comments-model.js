const mongoose = require('../db');

let replierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '回复人姓名不能为空']
  },
  content: {
    type: String,
    required: [true, '回复内容不能为空']
  }
})

let commentsSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, '文章id不能为空']
  },
  name: {
    type: String,
    required: [true, '评论人姓名不能为空']
  },
  content: {
    type: String,
    required: [true, '评论内容不能为空']
  },
  responses: {
    type: [replierSchema]
  }
})

module.exports = mongoose.model('comments', commentsSchema);
