import Vue from 'vue';
import VueRouter from 'vue-router';
import pages from './pages';

Vue.use(VueRouter);

function routerFactory(modules) {
  let routes = [];
  for (let key in modules) {
    routes.push({
      path: modules[key].path,
      component: modules[key]
    })
  }
  return routes;
}

export default new VueRouter({
  mode: 'history',
  routes: routerFactory(pages)
})

