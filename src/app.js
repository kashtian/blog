import Vue from 'vue';
import router from './router';
import App from './pages/app';

const app = new Vue({
  router,
  ...App     // 输出App的render方法
}).$mount('#app-container');

