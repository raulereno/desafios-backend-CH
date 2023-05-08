require("./dao/db");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const initializePassport = require("./config/passport.config");

const hbsHelpers = require("./helpers/index.js");
const passport = require("passport");
const { getProducstMock } = require("./utils/mockingProducts");

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

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("coderSecret"));
initializePassport();
app.use(passport.initialize());
//Routes
app.use("", routes);

app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

app.get("/mockingproducts", (req, res) => {
  res.send({ status: "success", payload: getProducstMock() });
});

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use(errorHandler);

module.exports = app;
