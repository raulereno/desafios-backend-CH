const express = require("express");
const server = express();
const PORT = 3001;
const routes = require("./routes/index");

server.use(express.json());

server.use("/", routes);

server.get("/", (req, res) => {
  res.send("hola");
});

server.listen(PORT, () => {
  console.log(`Server listen in port:${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
