require("dotenv").config();
require("./dao/index");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
//Routes
app.use("", routes);

app.get("/", (req, res) => {
  res.redirect("/products");
});

const server = app.listen(PORT, () => {
  console.log(`Server listening in port ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}/`);
});

server.on("error", (error) => {
  console.log(error);
});
