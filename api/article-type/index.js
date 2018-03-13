const ArticleType = require('./article-type-model');

let articleTypeApi = {
  add(req) {
    return ArticleType.find({
      name: req.body.name
    }).then(res => {
      if (res.length) {
        throw new Error('该类别已存在')
      }
      return ArticleType.create(req.body);
    })
  },

  // 获取所有文章类别
  getTypes() {
    return ArticleType.find().select('name');
  },

  // 根据id修改类别
  updateById(req) {
    return ArticleType.findByIdAndUpdate(req.body.id, {
      name: req.body.name
    }, {
      // 更新时开启验证
      runValidators: true
    }).then(res => {
      if (!res) {
        throw new Error('要更新的内容不存在')
      }
      return res;
    })
  },

  // 根据id删除类别
  deleteById(req) {
    if (!req.body.id) {
      return Promise.reject({message: '文章类别ID不能为空'})
    }
    return ArticleType.findByIdAndRemove(req.body.id)
      .then(result => {
        if (!result) {
          throw new Error('要删除的内容不存在')
        }
        if (result.n < 1) {
          throw new Error('删除文章类别失败')
        }
        return result;
      })
  }
}

module.exports = {
  articleTypeApi,
  articleTypeRouteMap: {
    'post /getall': articleTypeApi.getTypes
  }
}
