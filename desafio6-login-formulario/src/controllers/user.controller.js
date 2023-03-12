const {
  createUserService,
  loginUserService,
} = require("../services/user.service");
const { isValidPassword } = require("../utils/passwordHash");

const formLoginUser = (req, res) => {
  res.render("login");
};
const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);
    const validPassword = isValidPassword(user, req.body.password);

    if (validPassword) {
      req.session.user = user.username;
      res.status(200).send({ status: "success", payload: "login success" });
    } else {
      throw new Error("Constraseña incorrecta");
    }
  } catch (error) {
    next(error);
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
