// more thorough tests soon, trust.

(async() => {
  // fetch is native to node20, not required
  const fetch = require('node-fetch')

  const lmao = await fetch(`http://localhost:9000/info/list`, {
    headers: {
      Authorization: process.env.API_TOKEN
    },
  })

  console.log(await lmao.json())
})()