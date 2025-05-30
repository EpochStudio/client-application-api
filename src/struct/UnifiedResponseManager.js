const { _codes, StatusCode } = require('../codes/Codes')

module.exports = class UnifiedResponseManager {
  /**
   *
   * @param {import('./APIServer')} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   *
   * @param {import('express').Response} res
   * @param {Number} statusCode
   * @param {Object} args
   * @returns {import('express').Response}
   */
  makeResponse(res, statusCode, args = {}) {
    const validity = this.validateResponseCode(statusCode);
    if (!validity) {
      res.status(StatusCode.InternalServerError).json({
        statusCode: StatusCode.InternalServerError,
        message: "Internal Server Error occurred. Please try again later."
      })

      throw new Error(`Invalid Status Code detected. Returning ISE to client.`)
    }


    return res.status(statusCode).json({
      statusCode,
      ...args
    })
  }

  /**
   *
   * @param {Number} statusCode
   * @returns {Boolean}
   */
  validateResponseCode(statusCode) {
    return _codes.includes(statusCode);
  }
}