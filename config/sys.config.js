const port = process.env.PORT || '3011';

const mongoConfig = {
  url: 'mongodb://localhost:27017/blog'
}

const redisConfig = {
  host: process.env.redisHost || 'localhost',
  port: process.env.redisPort || 11001,
  db: process.env.redisDB == null ? 2 : process.env.redisDB
}

module.exports = {
  port,
  mongoConfig,
  redisConfig
}