module.exports = class Model {
  /**
   *
   * @param {string} name Name
   * @param {import('sequelize').ModelAttributes} attributes Attributes
   * @param {import('./Client')} client Client
   * @param {import('./Managers/DatabaseManager')} manager Manager
   */
  constructor(name, attributes, client, manager) {
    this.client = client;

    this.manager = manager;

    this.model = this.manager.sequalize.define(name, attributes)
  }
  async sync() {
    console.log("Database", `Syncing model: ${this.model.name}`)

    await this.model.sync({ alter: true });

    console.log('Database', `Synced Model: ${this.model.name}`)
  }
}