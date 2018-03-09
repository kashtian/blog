const mongoose = require('../db');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '用户名不能为空']
  },
  password: {
    type: String,
    required: [true, '密码不能为空']
  },
  email: {
    type: String,
    required: [true, '邮箱不能为空']
  },
  role: {
    type: Number,
    default: 2         // 1博主大人,2普通用户
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema);
