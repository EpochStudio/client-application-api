require('dotenv').config()
const express = require('express')
const ratelimit = require('express-rate-limit')
const Util = require('./Util')
const path = require('path')

module.exports = class APIServer {
  constructor() {
    this.app = express()
    this.config = require('../config')
    this.limiter = ratelimit(this.config.ratelimitConfig)

    /*
    this.routes = require('../../routes')
     */
    this.app.use(this.limiter)

    this.util = new Util(this)
    this.routeMap = new Map();
  }

  async init() {
    this.app.listen(this.config.serverPort, () => {
      console.log(`App running at Port: ${this.config.serverPort}`)
    })

    await this.util.LoadRoutes()

    this.app.use((req, res, next) => {
      console.log(req.method, req.url)

      /**
       * Example:
       *
       * Method: GET
       * req url /version
       */

      const splitting = req.url.split('/')

      const getRoute = this.routeMap.get(`${this.util.directory}/${req.url}/index.js`)
      if (!getRoute) res.json(400).status({
        code: "Code 400 - Not Found"
      })

      next()
    })
  }
  get lmao() {
    console.log(this.routeMap)
  }
}