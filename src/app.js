const express = require("express");
const products = require("./routes/products");

const productManager = require("./scripts/ProductManager");
const server = express();

const PORT = 8080;
server.use(express.json());
server.use("/products", products);

server.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const message = products
    .map((product) => {
      return `<li style="margin-bottom:10px"><a href='/products/${product.id}' >${product.title}</a> que seria igual a <b>/products/${product.id}</b></li>`;
    })
    .join("");

  res.send(`
  <h1>Bienvenido:</h1> 
  <ul>
  <li>Ingresa a <b>/products</b> para ver todos los productos.<a href="/products">Link</a></li>
  <li>Puedes limitar la cantidad de productos a visualizar agregando /products?limit=NUMERO por ejemplo /products?limit=5 mostrara los primeros cinco productos disponibles. <a href="/products?limit=3">Pruebalo</a></li>
  </ul>
  <h2>O ingresa a cada producto:</h2>
  <ul>
        ${message}
        <li>Si se ingresa un id que no existe se retorna un error. <a href="/products/999">Prueba</a></li>
  </ul>
  `);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`Link: http://localhost:${PORT}/`);
});
