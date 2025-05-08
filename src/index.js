(async () => {
  const APIServer = require('./struct/APIServer');
  const server = new APIServer()
  await server.init()
})()