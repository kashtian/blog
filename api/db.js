const mongoose = require('mongoose');
const { mongoConfig } = require('../config/sys.config');

mongoose.Promise = Promise;
mongoose.connect(mongoConfig.url);

const db = mongoose.connection;

db.on('error', err => {
  console.log('db error: ', err)
})
db.once('open', () => {
  console.log('database connected.')
})
db.on('disconnected', () => {
  console.log('database disconnected.')
})

module.exports = mongoose;


