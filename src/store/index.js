import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules'
import fetch from 'fetch'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: modules,

  state: {
    articles: []
  },

  actions: {
    GET_ALL_ARTICLES({state}) {
      return fetch({
        url: '/api/article/get'
      }).then(res => {
        if (res.code == 200) {
          state.articles = res.data;
        } else {
          res.msg && console.log(res.msg)
        }
      })
    }
  }
})

export default store;