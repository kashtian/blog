<template>
  <div class="ql-snow article-page">
    <h2 class="article-title">{{article.title}}</h2>
    <div class="desc">
      <div>
        <span>作者：{{article.author}}</span>
        <span class="type">【{{article.type}}】</span>
      </div>
      <div class="date">{{getDate(article.updateAt)}}</div>
    </div>
    <div class="article-content" ref="article" v-html="article.content"></div>
  </div>
</template>

<script>
import tools from '@/utils/tools';
import { mapState } from 'vuex'

export default {
  name: 'article-detail',
  path: '/articledetail/:id',
  title: '文章详情',

  data() {
    return {
      
    }
  },

  computed: {
    ...mapState({
      article: state => state.article.info
    })
  },

  preFetch(store, route) {
    return store.dispatch('GET_ARTICLE', route.params)
  },

  mounted() {
    if (typeof window != 'undefined') {
      Prism.highlightAllUnder(this.$refs.article)
    }
  },

  methods: {
    getDate(dateStr) {
      return tools.formatDate(new Date(dateStr), 'yyyy-MM-dd')
    },
  }
}
</script>

<style lang="less">
.article-page {
  margin: 0px auto;
  height: 100%;
  padding: 30pr 15%;
  background-color: #fefae7;
  box-sizing: border-box;
  overflow: auto;
  .article-title {
    text-align: center;
  }
  .desc {
    margin-bottom: 20pr;
    padding: 10pr 60pr;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28pr;
    color: #5d5454;
    .type {
      margin-left: 30pr;
    }
  }
  .article-content {
    height: auto;
    li {
      margin-bottom: 10pr;
    }
  }
}

@media screen and (max-width: 500px) {
  .article-page {
    padding: 30pr 10pr;
  }
}
</style>
