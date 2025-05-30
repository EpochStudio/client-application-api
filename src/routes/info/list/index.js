const Route = require('../../../struct/Route')
const {category} = require('../../../assets/info.json')
const { StatusCode } = require('../../../codes/Codes')

module.exports = class InfoListRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/list",
      path: __filename,
      authenticationLevel: "token"
    })
  }

  async execute(req, res, param) {
    return this.urm.makeResponse(res, StatusCode.OK, {
      categories: category
    })
  }
}