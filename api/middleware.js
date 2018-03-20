const redisClient = require('./redis-client');

const authPaths = ['/api/article/add', '/api/article/update', '/api/article/my', '/api/article/deleteById', '/api/user/info'];

const redisAuthFilter = (req, res, next) => {
  if (!authPaths.includes(req.path)) {
    next();
    return;
  } 
  let token = req.get('Authorization');
  if (!token) {
    res.json({
      code: 203,
      message: '请登录'
    })
    return;
  }
  redisClient.hgetallAsync(token)
  .then(user => {
    if (!user) {
      res.json({
        code: 203,
        message: '登录已过期，请重新登录'
      })
      return;
    }
    req.user = user;
    next();
  })
}

module.exports = {
  redisAuthFilter
}