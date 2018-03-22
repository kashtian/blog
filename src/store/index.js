import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules'
import fetch from 'fetch'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: modules,

  state: {
    articles: [],
    isLoading: false
  },

  actions: {
    GET_ALL_ARTICLES({state}, params) {
      return fetch({
        url: '/api/article/get',
        data: params
      }).then(res => {
        state.articles = res.data || [];
      }).catch(err => {
        if (typeof window != 'undefined') {
          alert(err.message)
        } else {
          console.log(err.message)
        }
      })
    }
  }
})

export default store;