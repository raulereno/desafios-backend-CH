require("./dao/index");
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

const hbsHelpers = require("./helpers/index.js");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      ...hbsHelpers,
    },
  })
);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
//Routes
app.use("", routes);

app.get("/", (req, res) => {
  res.redirect("/products?page=1&limit=10");
});

module.exports = app;
