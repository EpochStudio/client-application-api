(async() => {
  const fetch = require('node-fetch')

  const lmao = await fetch(`http://localhost:4000/info/commands/Fun`, {
    headers: {
      Authorization: "LMAO"
    }
  })

  console.log(await lmao.json())
})()