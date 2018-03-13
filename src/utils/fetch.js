let fetch = window.fetch;

const fetchapi = options => {
  return fetch(options.url, {
    method: 'POST',
    headers:{ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.token || ''
    },
    body: JSON.stringify(options.data)
  }).then(res => {
    return res.json();
  })
}

top.fetch = fetchapi;