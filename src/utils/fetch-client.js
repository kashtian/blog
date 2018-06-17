import axios from 'axios'
import store from '../store'
import router from '../router'

let loadingCount = 0;

const fetchapi = options => {
  loadingCount++
  store.state.isLoading = true;
  return new Promise((resolve, reject) => {    
    axios(Object.assign({
      method: 'POST',
      headers: { 
        'Authorization': localStorage.token || ''
      },
      timeout: 10 * 1000
    }, options)).then(res => {
      closeLoading()
      if (res.status == 200 && res.data.code == 200) {
        resolve(res.data)
      } else if (res.data.code == 203) {
        router.push('/login')
      } else {        
        reject(res.data)
      }
    }).catch(err => {
      closeLoading()
      reject(err)
    })
  })  
}

function closeLoading() {
  if (loadingCount > 0) {
    loadingCount--
  }  
  if (loadingCount == 0) {
    store.state.isLoading = false;
  }
}

export default fetchapi
