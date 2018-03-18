import fetch from 'fetch';

export default {
  state: {
    info: {}
  },

  actions: {
    GET_ARTICLE({state}, params) {
      return fetch({
        url: '/api/article/getById',
        data: {
          id: params.id
        }
      }).then(res => {
        if (res.code == 200) {
          state.info = res.data || {};          
        } else {
          res.msg && console.log(res.msg)
        }
      })
    }
  }
}