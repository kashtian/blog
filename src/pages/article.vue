<template>
  <div class="ql-snow article-page">
    <h2 class="article-title">{{article.title}}</h2>
    <div class="desc">
      <div>
        <span>作者：{{article.author}}</span>
        <span class="type">文章分类：{{article.type}}</span>
      </div>
      <div>更新于：{{article.date}}</div>
    </div>
    <div class="ql-editor article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import tools from '@/utils/tools';

export default {
  name: 'article-detail',
  path: '/articledetail/:id',
  title: '文章详情',

  data() {
    return {
      article: {}
    }
  },

  mounted() {
    this.getArticle();
  },

  methods: {
    getArticle() {
      fetch({
        url: '/api/article/getById',
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (res.code == 200) {
          this.article = res.data || {};
          this.article.date = tools.formatDate(new Date(this.article.updateAt), 'yyyy-MM-dd');
        } else {
          res.msg && alert(res.msg)
        }
      })
    }
  }
}
</script>

<style src="quill/dist/quill.snow.css"></style>

<style lang="less">
.article-page {
  margin: 0px auto;
  width: 80%;
  height: 100%;
  padding: 30pr 60pr;
  background-color: #fefae7;
  box-sizing: border-box;
  .article-title {
    text-align: center;
  }
  .desc {
    padding: 10pr 60pr;
    display: flex;
    justify-content: space-between;
    font-size: 28pr;
    color: #5d5454;
    .type {
      margin-left: 30pr;
    }
  }
  .article-content {
    height: auto;
  }
}
</style>
