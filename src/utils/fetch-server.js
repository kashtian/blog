import fetch from 'node-fetch'
const { port } = require('../../config/sys.config')

const fetchapi = options => {
  return fetch('http://localhost:' + port + options.url, {
    method: 'POST',
    headers:{ 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options.data)
  }).then(res => {
    return res.json();
  })
}

export default fetchapi