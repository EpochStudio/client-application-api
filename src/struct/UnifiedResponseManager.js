const { _codes } = require('../errors/ErrorCodes')

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
    if (!validity)
      throw new Error("Invalid response code.")


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