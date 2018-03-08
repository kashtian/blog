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
  updateDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema);
