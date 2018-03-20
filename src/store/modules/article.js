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
        return state.info = res.data || {};
      }).catch(err => {
        if (typeof window != 'undefined') {
          alert(err.message)
        } else {
          console.log(err.message)
        }        
      })
    }
  }
}