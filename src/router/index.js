import Vue from 'vue';
import VueRouter from 'vue-router';
import pages from '../pages';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: routerFactory(pages)
})

export default router;

function routerFactory(modules) {
  let routes = [],
      component = null;
  for (let key in modules) {
    component = modules[key];
    routes.push({
      name: component.name + '-router',
      path: component.path,
      component: component,
      meta: {
        title: component.title || 'my blog'
      }
    })
  }
  return routes;
}