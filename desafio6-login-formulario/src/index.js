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
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
  })
);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("", routes);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use(errorHandler);

module.exports = app;
