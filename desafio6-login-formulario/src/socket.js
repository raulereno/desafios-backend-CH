const http = require("http");
const { Server } = require("socket.io");
const app = require("./index");
const server = http.createServer(app);

const socket = new Server(server);

module.exports = {
  server,
};
