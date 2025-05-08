const {glob} = require('glob')
const path = require('path')
const Route = require('./Route')
const Model = require('./Model')

module.exports = class Util {
  /**
   *
   * @param {import('./APIServer')} client
   */
  constructor(client) {
    this.client = client;
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`
  }

  loadFiles(directory) {
    return glob(directory, {
      absolute: true
    });
  }

  async LoadRoutes() {
    await glob(path.join(this.directory, "routes", "**", "*.js"))
      .then((routeFile) => {
        for (const route of routeFile) {
          delete require.cache[route];

          const File = require(route);

          const routes = new File(this.client);

          if (!(routes instanceof Route)) throw new TypeError("Route File not a variant of Route main file.")

          this.client.routeMap.set(routes.name, routes)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


}