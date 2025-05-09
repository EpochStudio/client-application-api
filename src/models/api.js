const {DataTypes} = require('sequelize');
const Model = require('../struct/Model.js');

module.exports = class APIModel extends Model {
  constructor(client, manager) {
    super('api', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      level: {
        type: DataTypes.TEXT,
        defaultValue: "token"
      }
    }, client, manager)
  }

  create(token) {
    return this.model.create({
      token: token
    })
  }

  async getFromId(id) {
    return this.model.findOne({
      where: {
        id
      }
    })
  }

  async getFromToken(token) {
    return this.model.findOne({
      where: {
        token
      }
    })
  }

  async update(id, data) {
    return this.model.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return this.model.destroy({
      where: {
        id
      },
      force: true
    })
  }

  async fetch(id, token) {
    const config = await this.get(id);

    if (!config) {
      return this.create(token)
    }

    return config;
  }
}