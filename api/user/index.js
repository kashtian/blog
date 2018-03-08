const User = require('./user-model');

module.exports = {
  create(req) {
    return User.create(req.body)
  },

  find() {
    return User.find({name: 'kash5'})
  }
};