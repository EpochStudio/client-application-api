const { StatusCode } = require('../errors/ErrorCodes')

/**
 *
 * @typedef {Object} Options
 * @property {?string} name
 * @property {?path} path
 * @property {"none"|"token"|"staff"} authenticationLevel
 * @property {boolean} disabled
 */
module.exports = class Route {
  /**
   *
   * @param {import('./APIServer')} client
   * @param {Options} options
   */
  constructor(client, options = {}) {
    this.client = client;

    this.name = options.name;

    this.path = options.path.split('routes')[1]

    this.authenticationLevel = options.authenticationLevel || "none"

    this.disabled = options.disabled || false;
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {...any} args
   * @returns {Promise<void>}
   */
  async execute(req, res, ...args) {
    this.client.urm.makeResponse(res, StatusCode.InternalServerError, {
      message: "This method exists, however the code for it has not been implemented."
    })
    throw new Error("The execute method has not been implemented on this API Route.")
  }
}