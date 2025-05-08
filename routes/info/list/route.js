const {category} = require('../../../src/assets/info.json')
const {Request, Response} = require('express')

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function (req, res) {
  res.status(200).json({
    categories: category
  })
}