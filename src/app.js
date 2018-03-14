import Vue from 'vue';
import router from './router';
import store from './store';
import App from './pages/App';
import { sync } from 'vuex-router-sync';

// 注册全局表单验证指令
require('./directives/form-validate')(Vue);

// this registers `store.state.route`
sync(store, router);

const app = new Vue({
  router,
  store,
  ...App     // 输出App的render方法
});

export { app, router, store }

