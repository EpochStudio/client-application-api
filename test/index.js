(async() => {
  const fetch = require('node-fetch')

  const lmao = await fetch(`http://localhost:8080/list`)

  console.log(await lmao.json())
})()