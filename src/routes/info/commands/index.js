const Route = require('../../../struct/Route')
const {category, commands} = require('../../../assets/info.json')
const {sorting} = require('../../../utils')
const fetch = require('node-fetch')
const { StatusCode } = require('../../../errors/ErrorCodes')

module.exports = class InfoCommandRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/commands",
      path: __filename,
      authenticationLevel: "token"
    })
  }

  async execute(req, res, param) {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) return this.urm.makeResponse(res, StatusCode.InternalServerError, {
      message: "Server environment variables not configured."
    })

    if (!param || !param.category || !category.includes(param.category)) return this.urm.makeResponse(res, StatusCode.BadRequest, {
      message: `Missing param 'category' or the provided param 'category' is invalid.`
    })

    try {
      const fetchApi = await fetch(`https://discord.com/api/v10/applications/${process.env.BOT_ID}/commands`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`
        }
      })

      if (fetchApi.ok) {
        const data = await fetchApi.json()
        const sort = sorting(data, commands, param.category)

        return this.urm.makeResponse(res, StatusCode.OK, {
          length: sort.toHuman.length,
          fetchedCategory: param.category,
          commands: sort.toHuman,
          raw: sort.raw
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