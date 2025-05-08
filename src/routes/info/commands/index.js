const Route = require('../../../struct/Route')
const {category, commands} = require('../../../assets/info.json')
const {sorting} = require('../../../utils')
const fetch = require('node-fetch')

module.exports = class VersionRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/commands",
      path: `${__filename.split("routes")[1]}`,
      authenticationLevel: "token"
    })
  }

  async execute(req, res, param) {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error - Environment Variables Not Configured.",
      })
    }

    if (!param || !param.category || !category.includes(param.category)) return res.status(400).json({
      code: 400,
      message: "Bad Request - Missing param \"category\" or the provided param \"category\" is invalid."
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

        res.status(200).json({
          length: sort.toHuman.length,
          fetchedCategory: param.category,
          commands: sort.toHuman,
          raw: sort.raw
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