<template>
    <div class="home">
        <header>
            <div class="intro">
                <div class="title">I AM KASH</div>
                <div class="small-title">欢迎来到我的主页</div>
            </div>
        </header>

        <section class="article-list">
          <h3>文章列表</h3>

          <div v-for="item in articles" :key="item._id" @click="goArticleDetail(item)">
            <span class="date">{{getDate(item.updateAt)}}</span>
            <span>{{item.title}}</span>
          </div>

          <div v-if="articles && !articles.length">暂时没有发表文章</div>
        </section>
    </div>
</template>

<script>
import tools from '@/utils/tools';
import { mapState } from 'vuex'

export default {
  name: 'home',
  path: '/',
  title: '首页',

  data() {
    return {
      
    }
  },

  computed: {
    ...mapState({
      articles: state => state.articles
    })
  },

  preFetch(store, route) {
    return store.dispatch('GET_ALL_ARTICLES', {
      conditions: {
        publish: true
      }
    })
  },

  methods: {
    getDate(dateStr) {
      return tools.formatDate(new Date(dateStr), 'yyyy年MM月dd日')
    },

    goArticleDetail(item) {
      this.$router.push({
        name: 'article-detail',
        params: {
          id: item._id,
          title: item.title
        }
      })
    }
  }
}
</script>

<style lang="less">
.home {
    header {
        height: 800pr;
        color: #fff;        
        font-size: 40pr;
        text-align: center;
        background: no-repeat center url('../images/yourname_bg.jpg');
        background-size: 100%;
        .intro {
            height: 100%;
            background: rgba(0,0,0,0.5);            
            overflow: hidden;
        }
        .title {
            margin: 240pr 0px 60pr;            
            font-size: 100pr;
        }
    }
    .article-list {
      padding: 30pr 60pr;
      .date {
        margin-right: 30pr;
        color: #5f5e5e;
      }
    }
}
</style>
