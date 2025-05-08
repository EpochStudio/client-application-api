const {Sequelize} = require('sequelize');
const Model = require('./Model');
const path = require('path');

module.exports = class DatabaseManager {
  constructor(client) {
    this.client = client;

    this.sequalize = new Sequelize(
      this.client.config.loginCredentials.postgres.database,
      this.client.config.loginCredentials.postgres.username,
      this.client.config.loginCredentials.postgres.password,
      {
        dialect: this.client.config.loginCredentials.postgres.dialect,
        host: process.env.DB_HOST,
        logging: this.client.config.loginCredentials.postgres.logging ? this.log.bind(this) : false,
        define: {
          timestamps: false,
          freezeTableName: true
        }
      }
    )

    /**
     *
     * @type {Object.<string, Model>}
     */
    this.models = {}
  }

  /**
   *
   * @param {String} query
   * @param {Object} queryOptions
   * @returns {Promise<{results: unknown[], metadata: Object}>}
   */
  async query(query = '', queryOptions = {})  {
    const [results, metadata] = await this.sequalize.query(query, queryOptions)

    return { results, metadata }
  }

  get directory() {
    return `${this.client.util.directory}/models/*.js`
  }

  log(message) {
    console.log('Database', message);
  }

  async load() {
    await this.connect();
    await this.loadModels();
  }

  async connect() {
    console.log('Database', 'Connecting to the database...');

    try {
      await this.sequalize.authenticate();
      console.log('Database', 'Connection has been established successfully.');
    } catch (error) {
      console.log(error);
    }
  }

  async loadModels() {
    const modelFiles = await this.client.util.loadFiles(this.directory);

    console.log('Database', `Loading a total of ${modelFiles.length} models.`);

    for (const filePath of modelFiles) {
      delete require.cache[filePath];

      const {name} = path.parse(filePath);

      console.log('Database', `Loading Model: ${name}`);

      const File = require(filePath);

      const model = new File(this.client, this);

      if (!(model instanceof Model)) {
        throw new TypeError('File is not an instance of Model');
      }

      await model.sync({alter: true});

      this.models[name] = model;

      console.log('Database', `Loaded Model: ${name}`);
    }
  }
}