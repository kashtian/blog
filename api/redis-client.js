const { promisify } = require('util');
const redis = require('redis');
const { redisConfig } = require('../config/sys.config');
const log4js = require('log4js');

const client = redis.createClient(redisConfig);
const log = log4js.getLogger('redis');

client.on('error', err => {
  log.error('Redis error: ', err);
  console.log('Redis error: ', err);
})

log.debug('redis debug: ', 'tset')
log.error('redis error: ', 'test')

// 将原始get方法封装成promise
client.hgetallAsync = promisify(client.hgetall);

module.exports = client;