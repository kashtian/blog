import fetch from 'node-fetch'
const { port } = require('../../config/sys.config')

const fetchapi = options => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:' + port + options.url, {
      method: 'POST',
      headers:{ 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options.data)
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.code == 200) {
        resolve(res)
      }
      reject(res)
    }).catch(err => {
      reject(err)
    })
  })  
}

export default fetchapi