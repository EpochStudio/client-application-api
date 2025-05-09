const Route = require('../../struct/Route')

module.exports = class VersionRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/version",
      path: __filename,
      authenticationLevel: "none"
    })
  }
  async execute(req, res) {
    res.status(200).json({
      api: this.client.config.version,
      bot: "v5.1.0"
    })
  }
}