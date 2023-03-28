require("./dao/index");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const MongoStore = require("connect-mongo");
const MONGO_URL = process.env.MONGO_URL;
const app = express();

const hbsHelpers = require("./helpers/index.js");
const initializePassport = require("./config/passport.config");
const passport = require("passport");

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      ...hbsHelpers,
    },
  })
);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useUnifiedTopology: true },
    }),
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cookieParser("123456789"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initializePassport();
app.use(passport.initialize());
//Routes
app.use("", routes);

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use(errorHandler);

module.exports = app;
