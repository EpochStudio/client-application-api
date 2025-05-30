require('dotenv').config()
const express = require('express')
const ratelimit = require('express-rate-limit')
const Util = require('./Util')
const Database = require('./Database')
const UnifiedResponseManager = require('./UnifiedResponseManager')
const { StatusCode } = require('../codes/Codes')

module.exports = class APIServer {
  constructor() {
    this.app = express()
    this.config = require('../config')
    this.limiter = ratelimit(this.config.ratelimitConfig)

    this.app.use(this.limiter)

    this.util = new Util(this)
    this.routeMap = new Map();

    this.database = new Database(this)
    this.urm = new UnifiedResponseManager(this)
  }

  async init() {
    await this.database.load()
    await this.util.LoadRoutes()

    this.app.listen(this.config.serverPort, () => {
      console.log(`App running at Port: ${this.config.serverPort}`)
    })

    this.app.use((req, res, _next) => {
      if (req.url === '/favicon.ico') return this.urm.makeResponse(res, StatusCode.Forbidden, {
        message: "Forbidden GET URL"
      })

      const getRoute = this.routeMap.get(req.url.split("?")[0])

      if (!getRoute) return this.urm.makeResponse(res, StatusCode.NotImplemented, {
        message: "This endpoint does not exist."
      })

      if (getRoute.disabled) return this.urm.makeResponse(res, StatusCode.ServiceUnavailable, {
        message: "This endpoint is currently disabled."
      })

      const Headers = req.headers;
      if (getRoute.authenticationLevel !== 'none') {
        if (!Headers['authorization']) return this.urm.makeResponse(res, StatusCode.Unauthorized, {
          message: "Authorization is required for this endpoint"
        })

        const checkValidity = this.database.models.api.getFromToken(Headers['authorization'])
        if (!checkValidity) return this.urm.makeResponse(res, StatusCode.Unauthorized, {
          message: "Faulty Authorization. The provided authorization is invalid."
        })

        if (checkValidity.level !== 'staff' && getRoute.authenticationLevel === 'staff') return this.urm.makeResponse(res, StatusCode.Unauthorized, {
          message: "Insufficient Clearance. This endpoint requires a higher-level token clearance."
        })
      }

      getRoute.execute(req, res, req.query);
    })
  }

  get lmao() {
    console.log(this.routeMap)
  }
}