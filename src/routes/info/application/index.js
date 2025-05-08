const Route = require('../../../struct/Route')
const fetch = require('node-fetch')

module.exports = class InfoApplicationRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/application",
      path: `${__filename.split("routes")[1]}`,
      authenticationLevel: "staff"
    })
  }

  async execute(req, res, param) {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error - Environment Variables Not Configured.",
      })
    }

    try {
      const fetchApi = await fetch(`https://discord.com/api/v10/applications/@me`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`
        }
      })

      if (fetchApi.ok) {
        const data = await fetchApi.json()

        return res.status(200).json({
          code: 200,
          data: data || {}
        })
      } else {
        return res.status(502).json({
          code: 502,
          message: "Bad Gateway - Invalid response received from Discord API."
        })
      }
    } catch (err) {
      console.log(err)

      res.status(500).json({
        code: 500,
        message: "Internal Server Error - Something went wrong while handling your request."
      })
    }
  }
}