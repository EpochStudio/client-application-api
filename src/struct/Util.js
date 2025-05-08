const {glob} = require('glob')
const path = require('path')
const Route = require('./Route')
const {Snowflake} = require("@sapphire/snowflake");

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

        console.log(`Loaded in ${this.client.routeMap.size} endpoints`)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  get snowflake() {
    const epoch = new Date(1614248446712);

    const snowflake = new Snowflake(epoch);

    return snowflake.generate();
  }
  async generateToken() {
    return this.client.database.models.api.create(this.snowflake)
  }
}