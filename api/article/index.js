const Article = require('./article-model');

let articleApi = {
  add(req) {
    return Article.create(req.body)
  },

  // 根据文章ID修改文章
  updateById(req) {
    if (!req.body.id) {
      return Promise.reject({message: '文章ID不能为空'})
    }
    delete req.body._id
    return Article.findByIdAndUpdate(req.body.id, req.body, {
      // 更新时开启验证
      runValidators: true
    }).then(res => {
      if (!res) {
        throw new Error('要更新的内容不存在')
      }
      return res;
    })
  },

  // 根据文章ID删除文章
  deleteById(req) {
    if (!req.body.id) {
      return Promise.reject({message: '文章ID不能为空'})
    }
    return Article.findByIdAndRemove(req.body.id)
      .then(result => {
        if (!result) {
          throw new Error('要删除的内容不存在')
        }
        if (result.n < 1) {
          throw new Error('删除文章类别失败')
        }
        return result;
      })
  },

  // 根据条件返回筛选文章
  getArticles(req) {
    return Article.find(req.body.conditions).limit(req.body.limit).sort(req.body.sort || '-updateAt')
  },

  // 根据ID查找文章
  getArticleById(req) {
    if (!req.body.id) {
      return Promise.reject({message: '文章ID不能为空'})
    }
    return Article.findById(req.body.id)
  },

  // 根据token获取我的所有文章
  getMyArticles(req) {
    return Article.find({
      author: req.user.name
    }).sort('-updateAt')
  },

  // 检查该用户是否发布过相同标题的文章
  checkTitle(req) {
    return Article.find({
      author: req.user.name,
      title: req.body.title
    }).limit(1).select('title type')
  }

}

module.exports = {
  articleApi,
  articleRouteMap: {
    'post /add': articleApi.add,
    'post /update': articleApi.updateById,
    'post /get': articleApi.getArticles,
    'post /getById': articleApi.getArticleById,
    'post /my': articleApi.getMyArticles,
    'post /deleteById': articleApi.deleteById,
    'post /checkTitle': articleApi.checkTitle
  }
}
