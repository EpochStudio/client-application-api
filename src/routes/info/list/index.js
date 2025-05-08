const Route = require('../../../struct/Route')
const {category} = require('../../../assets/info.json')

module.exports = class InfoListRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/info/list",
      path: `${__filename.split("routes")[1]}`,
      authenticationLevel: "token"
    })
  }

  async execute(req, res, param) {
    res.status(200).json({
      categories: category
    })
  }
}