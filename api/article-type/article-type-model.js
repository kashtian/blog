const mongoose = require('../db');

let typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '类别名不能为空']
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('articleType', typeSchema);
