const Route = require('../../../struct/Route')
const fetch = require('node-fetch')
const { StatusCode } = require('../../../codes/Codes')

module.exports = class InfoApplicationRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/application",
      path: __filename,
      authenticationLevel: "staff"
    })
  }

  async execute(req, res, param) {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) return this.urm.makeResponse(res, StatusCode.InternalServerError, {
      message: "Server environment variables not configured."
    })

    try {
      const fetchApi = await fetch(`https://discord.com/api/v10/applications/@me`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`
        }
      })

      if (fetchApi.ok) {
        const data = await fetchApi.json()

        return this.urm.makeResponse(res, StatusCode.OK, {
          data: data || {}
        })
      } else {
        return this.urm.makeResponse(res, StatusCode.BadGateway, {
          message: "Invalid response received from the Discord API."
        })
      }
    } catch (err) {
      console.log(err)

      return this.urm.makeResponse(res, StatusCode.InternalServerError, {
        message: "Something went wrong while handling your request."
      })
    }
  }
}