const User = require('./user-model');

let userApi = {
  create(req) {
    return User.create(req.body)
  },

  find() {
    return User.find().where('password').equals('test').select('name')
  },

  remove() {
    return User.remove({name: /kash/})
  },

  update() {
    return User.update({name: 'kash'}, {password: 'kash321'}, {
      // 更新时开启验证
      runValidators: true,
      multi: true
    })
  }
};

let routeMap = {
  
}

module.exports = {
  userApi
}