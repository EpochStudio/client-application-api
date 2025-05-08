// more thorough tests soon, trust.

(async() => {
  // fetch is native to node20, not required
  const fetch = require('node-fetch')

  const lmao = await fetch(`http://49.13.205.251:9000/info/commands=c`, {
    headers: {
      Authorization: "LMAO"
    },
  })

  console.log(await lmao.json())
})()