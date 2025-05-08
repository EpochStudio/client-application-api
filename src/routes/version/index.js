const Route = require('../../struct/Route')

module.exports = class VersionRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "xd",
      path: __filename,
      authenticationLevel: "none"
    })
  }
  async execute(req, res) {
    res.status(200).json({
      code: 'success'
    })
  }
}