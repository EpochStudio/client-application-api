const Route = require('../../struct/Route')
const { StatusCode } = require('../../codes/Codes')

module.exports = class ListRouteRoute extends Route {
  constructor(...args) {
    super(...args, {
      name: "/listroute",
      path: __filename,
      authenticationLevel: 'none'
    });
  }
  async execute(req, res, _param) {
    return res.status(StatusCode.OK).json({
      list: [...this.client.routeMap.keys()]
    })
  }
}