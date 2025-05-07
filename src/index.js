require('dotenv').config()

const express = require('express')
const ratelimit = require('express-rate-limit')
const fetch = require('node-fetch')
const config = require('./config.js')
const { category, commands } = require('./assets/info.json')
const { sorting } = require('./utils')

const app = express()
const limiter = ratelimit(config.ratelimitConfig)

app.use(limiter)

app.get('/', (req, res) => {
    res.redirect('/gimmie/commands/all')
})

app.get('/list', (req, res) => {
    res.status(200).json({
        categories: category
    })
})

app.get('/version', (req, res) => {
  res.status(200).json({
      api: config.version,
      client: "5.1.0"
  })
})

app.get('/gimmie/commands/:cate', async (req, res) => {
    if (!process.env.BOT_ID || !process.env.BOT_TOKEN) {
        return res.status(500).json({
            error: "Error 500 - Internal Server Error!",
            type: "Not Configured"
        })
    }

    /**
     * @type {string}
     */
    const searchParams = req.params.cate;

    if (!category.includes(searchParams)) {
        return res.status(400).json({
            error: "Error 400 - Bad Request!"
        })
    }


    try {
        const fetchApi = await fetch(`https://discord.com/api/v10/applications/${process.env.BOT_ID}/commands`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        })

        if (fetchApi.ok) {
            const data = await fetchApi.json()
            const sort = sorting(data, commands, searchParams)

            res.status(200).json({
                length: sort.toHuman.length,
                fetchedCategory: searchParams,
                commands: sort.toHuman,
                raw: sort.raw
            })
        } else {
            return res.status(404).json({ error: "Error 404 - Not Found!" })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({
            error: "Error 500 - Internal Server Error!",
            type: "Runtime Error",
            message: err.message,
            fullErr: err
        })
    }
})




app.listen(config.serverPort, () => {
    console.log(`App running at Port: ${config.serverPort}`)
})