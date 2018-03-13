const redisClient = require('./redis-client');

const authPaths = [];

const redisAuthFilter = (req, res, next) => {
  if (!authPaths.includes(req.path)) {
    next();
    return;
  } 
  let token = req.get('Authorization');
  if (!token) {
    res.json({
      code: 203,
      msg: '请登录'
    })
    return;
  }
  redisClient.hgetallAsync(token)
  .then(user => {
    if (!user) {
      res.json({
        code: 203,
        msg: '登录已过期，请重新登录'
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