const http = require("http");
const server = require("./server");
const httpServer = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const {
  getProducts,
  addProduct,
  deleteProduct,
} = require("./controllers/products.controllers");

let products = [];

(async function () {
  products = await getProducts();
})();

io.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.emit("all products", products);
});

module.exports = {
  httpServer,
  emitProducts: async function (product) {
    await addProduct(product);
  },
  deleteProduct: async function (id) {
    await deleteProduct(id);
  },
};
