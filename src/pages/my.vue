<template>
  <div class="my-page">
    <h3>我的文章列表</h3>

    <div class="article-item" v-for="(item, index) in articles" :key="item._id">
      <div>
        <span>{{item.title}}</span>
        <span>【{{item.type}}】</span>
      </div>
      <div class="operate">
        <span class="operate-item" @click="toArticle(item)">查看</span>
        <span class="operate-item" @click="toEdit(item)">编辑</span>
        <span class="operate-item" @click="togglePublish(item)">{{item.publish ? '取消发布' : '发布'}}</span>
        <span class="operate-item" @click="deleteById(item, index)">删除</span>
      </div>
    </div>

  </div>
</template>

<script>
import fetch from 'fetch'

export default {
  name: 'my',
  path: '/my',
  title: '我的',

  data() {
    return {
      articles: ''
    }
  },

  mounted() {
    this.getArticles()
  },

  methods: {
    // 获取我的所有文章
    getArticles() {
      fetch({
        url: '/api/article/my'
      }).then(res => {
        this.articles = res.data || [];
      }).catch(err => {
        if (err.code == 203) {
          this.$router.push('/login')
        }
        alert(err.message)
      })
    },

    // 发布或取消发布文章
    togglePublish(item) {
      fetch({
        url: '/api/article/update',
        data: {
          id: item._id,
          publish: !item.publish
        }
      }).then(res => {
        if (item.publish) {
          alert('文章已取消发布')
        } else {
          alert('文章已发布')
        }
        item.publish = !item.publish
      }).catch(err => {
        alert(err.message)
      })
    },

    // 查看文章详情
    toArticle(item) {
      this.$router.push(`/articledetail/${item._id}`)
    },

    // 跳转文章编辑页面
    toEdit(item) {
      this.$router.push(`/editor/${item._id}`)
    },

    // 删除文章
    deleteById(item, index) {
      let dialog = confirm('确定要删除该文章吗？')
      if (!dialog) {
        return
      }
      fetch({
        url: '/api/article/deleteById',
        data: {
          id: item._id
        }
      }).then(res => {
        this.articles.splice(index, 1)
        alert('删除成功')
      }).catch(err => {
        alert(err.message)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my-page {
  padding: 30pr 20%;
  .article-item {
    margin-top: 20pr;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  .operate-item {
    margin-right: 20pr;
    text-decoration: underline;
  }
}

@media screen and (max-width: 500px) {
  .my-page {
    .article-item {
      display: block;
      width: 100%;
    }
  }
}
</style>
