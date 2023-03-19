const {
  createUserService,
  loginUserService,
} = require("../services/user.service");
const { isValidPassword } = require("../utils/passwordHash");

const formLoginUser = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res, next) => {
  const email = req.body.username;
  const password = req.body.password;

  if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.user = {
      username: "admin",
      email: email,
      rol: "admin",
      cartId: "641726560cc8ca812ef88907",
    };

    res.status(200).send({ status: "success", payload: "login success" });
  } else {
    try {
      const user = await loginUserService(req.body);
      const validPassword = isValidPassword(user, req.body.password);

      if (validPassword) {
        req.session.user = user;

        res.status(200).send({
          status: "success",
          payload: "login success",
        });
      } else {
        throw new Error("Constraseña incorrecta");
      }
    } catch (error) {
      next(error);
    }
  }
};

const formRegisterUser = (req, res) => {
  res.render("register");
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);

    res.cookie("cartId", newUser.cartId);

    res
      .status(201)
      .json({ status: "success", payload: "Usuario creado correctamente" });
  } catch (error) {
    next(error);
  }
};
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    } else res.send({ status: "Logout Error", body: err });
  });
};

module.exports = {
  formLoginUser,
  loginUser,
  formRegisterUser,
  createUser,
  logoutUser,
};
