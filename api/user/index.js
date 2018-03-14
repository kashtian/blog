const User = require('./user-model');
const redisClient = require('../redis-client');

let userApi = {
  login(req) {
    if (!req.body.name || !req.body.password) {
      return Promise.reject({message: '用户名或密码不能为空'})
    }
    return User.find({
      name: req.body.name
    }).then(res => {
      if (!res.length) {
        throw new Error('该用户不存在')        
      } else if (res[0].password != req.body.password) {
        throw new Error('用户名密码不匹配')        
      }  
      let token = require('crypto').randomBytes(20).toString('hex'); 
      redisClient.hmset(token, {
        name: res[0].name,
        email: res[0].email,
        role: res[0].role
      });
      redisClient.expire(token, 24 * 60 * 60)
      return token;
    })    
  },

  // 新增普通用户
  add(req) {
    if (req.body.role) {
      req.body.role = '';
    }
    return User.find({
      name: req.body.name
    }).then(res => {
      if (res.length) {
        throw new Error('该用户名已存在')
      }
      return User.create(req.body);
    })    
  },

  // 根据ID删除用户
  deleteById(req) {
    if (!req.body.id) {
      return Promise.reject({message: '用户ID不能为空'})
    }
    return User.findByIdAndRemove(req.body.id)
      .then(result => {
        if (!result) {
          throw new Error('要删除的内容不存在')
        }
        if (result.n < 1) {
          throw new Error('删除用户失败')
        }
        return result;
      })
  },

  // 根据token查询用户信息
  userInfo(req) {
    if (req.user) {
      return Promise.resolve(req.user)
    } else {
      return Promise.reject({message: '没有获取到用户信息'})
    }
  }

}

module.exports = {
  userApi,
  userRouteMap: {
    'post /login': userApi.login,
    'post /add': userApi.add,
    'post /delete': userApi.delete,
    'post /info': userApi.userInfo
  }  
}


// let userApi = {
//   create(req) {
//     return User.create(req.body)
//   },

//   find() {
//     return User.find().where('name').equals('kash').select('name')
//   },

//   remove() {
//     return User.remove({name: /kash/})
//   },

//   update() {
//     return User.update({name: 'kash'}, {password: 'kash321'}, {
//       // 更新时开启验证
//       runValidators: true,
//       multi: true
//     })
//   }
// };