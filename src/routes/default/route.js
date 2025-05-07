const { Request, Response } = require('express')

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function(req, res) {
  res.redirect('/gimmie/commands/all')
}