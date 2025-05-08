require('dotenv').config()
const express = require('express')
const ratelimit = require('express-rate-limit')
const Util = require('./Util')
const Database = require('./Database')

module.exports = class APIServer {
  constructor() {
    this.app = express()
    this.config = require('../config')
    this.limiter = ratelimit(this.config.ratelimitConfig)

    this.app.use(this.limiter)

    this.util = new Util(this)
    this.routeMap = new Map();

    this.database = new Database(this)
  }

  async init() {
    await this.database.load()
    await this.util.LoadRoutes()


    this.app.listen(this.config.serverPort, () => {
      console.log(`App running at Port: ${this.config.serverPort}`)
    })

    this.app.use((req, res, _next) => {
      if (req.url === '/favicon.ico') return res.status(403).json({
        code: "Code 403 - Forbidden URL"
      })

      const getRoute = this.routeMap.get(req.url.split("?")[0])

      if (!getRoute) return res.status(400).json({
        code: "Code 400 - Not Found"
      })

      const Headers = req.headers;
      if (getRoute.authenticationLevel !== 'none') {
        if (!Headers['authorization']) return res.status(401).json({
          code: "Code 403 - Unauthorized"
        })


        const checkValidity = !!this.database.models.api.getFromToken(Headers['authorization'])
        if (!checkValidity) return res.status(401).json({
          code: "Code 403 - Unauthorized, Faulty API Token"
        })

        if (checkValidity.level === 'token' && getRoute.authenticationLevel === 'staff') return res.status(403).json({
          code: "Code 403 - Unauthorized, this endpoint requires a higher clearance of Token."
        })
      }

      getRoute.execute(req, res, req.query);
    })
  }

  get lmao() {
    console.log(this.routeMap)
  }
}