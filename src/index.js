require('dotenv').config()

const express = require('express')
const ratelimit = require('express-rate-limit')
const fetch = require('node-fetch')
const config = require('./config.js')
const { categories } = require('./assets/info.json')
const { formatters } = require('./utils')

const app = express()
const limiter = new ratelimit(config.ratelimitConfig)

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
    res.status(200).json(categories)
})

/**
 * @param req
 * @param res
 * @returns {Object}
 */
app.get('/gimmie/commands/:cate', async (req, res) => {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) {
        throw new Error("Failed to obtain client information, returning empty object.")
        
        res.status(200).json({})
    }

    try {
        const fetchApi = await fetch(`https://discord.com/api/v10/application/${process.env.BOT_ID}/commands`, {
            Authorization: `Bot ${process.env.BOT_TOKEN}`
        })
        
        if (fetchApi.ok) {
            const data = await fetchApi.data()
            if (!data) {
                throw new Error("No data returned. Aborting request. Returning empty object.")

                res.status(200).json({})
            }

            
        } else {
            res.status(200).json({})
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
            fullErr: err
        })
    }
})




app.listen(config.serverPort, () => {
    console.log(`App running at Port: ${config.serverPort}`)
})