require('dotenv').config()

const express = require('express')
const ratelimit = require('express-rate-limit')
const config = require('./config.js')
const Routes = require('./routes')

const app = express()
const limiter = ratelimit(config.ratelimitConfig)

app.use(limiter)

app.get('/', (req, res) => {
    return Routes.default(req, res)
})

app.get('/list', (req, res) => {
    return Routes.list(req, res)
})

app.get('/version', (req, res) => {
    return Routes.version(req, res)
})

app.get('/gimmie/commands/:cate', (req, res) => {
    return Routes.gimmie.commands(req, res)
})




app.listen(config.serverPort, () => {
    console.log(`App running at Port: ${config.serverPort}`)
})