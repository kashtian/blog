import axios from 'axios'

const fetchapi = options => {
  return new Promise((resolve, reject) => {
    axios(Object.assign({
      method: 'POST',
      headers: { 
        'Authorization': localStorage.token || ''
      },
      timeout: 10 * 1000
    }, options)).then(res => {
      if (res.status == 200 && res.data.code == 200) {
        resolve(res.data)
      } 
      reject(res.data)
    }).catch(err => {
      reject(err)
    })
  })  
}

export default fetchapi