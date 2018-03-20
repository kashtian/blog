import { app, router, store } from './app.js';

router.afterEach((to, from) => {
  if (window.__INITIAL_STATE__) {
    return;
  }
  Promise.all(to.matched.map(item => {
    if (item.components.default.preFetch) {
      return item.components.default.preFetch(store, to);
    }
  })).then(() => {
    setTitle(to.params.title || to.meta.title);
  })
})

function setTitle(title) {
  document.title = title || 'my blog';
}

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

delete window.__INITIAL_STATE__;

app.$mount('#app');