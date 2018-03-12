const redisClient = require('./redis-client');

const authPaths = ['/api/user/add'];

const redisAuthFilter = (req, res, next) => {
  if (!authPaths.includes(req.path)) {
    next();
    return;
  } 
  let token = req.get('Authorization');
  if (!token) {
    res.redirect('/login');
    return;
  }
  redisClient.hgetallAsync(token)
  .then(user => {
    if (!user) {
      res.redirect('/login');
      return;
    }
    req.user = user;
    next();
  })
}

module.exports = {
  redisAuthFilter
}