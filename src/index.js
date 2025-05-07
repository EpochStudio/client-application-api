require('dotenv').config()

const express = require('express')
const ratelimit = require('express-rate-limit')
const fetch = require('node-fetch')
const config = require('./config.js')
const { category } = require('./assets/info.json')
const { formatters } = require('./utils')

const app = express()
const limiter = ratelimit(config.ratelimitConfig)

app.use(limiter)

app.get('/', (req, res) => {
    res.redirect('/gimmie/commands')
})

/**
 * @param req
 * @param res
 * @returns {Array<categories}
 */
app.get('/list', (req, res) => {
    res.status(200).json({
        categories: category
    })
})

/**
 * @param req
 * @param res
 * @returns {Object}
 */
app.get('/gimmie/commands/', async (req, res) => {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) {
        res.status(200).json({})
    }

    try {
        const fetchApi = await fetch(`https://discord.com/api/v10/applications/${process.env.BOT_ID}/commands`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        })

        if (fetchApi.ok) {
            const data = await fetchApi.json()

            res.status(200).json({
                commands: !data ? [] : data
            })
        } else {
            res.status(200).json({ status: 0 })
        }
    } catch (err) {
        console.log(err)

        res.status(400).json({
            message: err.message,
            fullErr: err
        })
    }
})




app.listen(config.serverPort, () => {
    console.log(`App running at Port: ${config.serverPort}`)
})