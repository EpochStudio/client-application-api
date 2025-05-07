const {Response, Request} = require('express')
const Config = require('../../config')

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function (req, res) {
  res.status(200).json({
    api: Config.version,
    client: "5.1.0"
  })
}