const {
  createUserService,
  findUserService,
} = require("../services/user.service");
const { generateAuthToken } = require("../utils/jwt");
const { isValidPassword } = require("../utils/passwordHash");

const formLoginUser = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res, next) => {
  try {
    const user = await findUserService(req.body);

    const validPassword = isValidPassword(user, req.body.password);

    if (validPassword) {
      const access_token = generateAuthToken(user.email);

      console.log(access_token);

      res.cookie("access_token", access_token);

      res.status(200).send({
        status: "success",
        payload: "login success",
        cartId: user.cartId,
      });
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
    await createUserService(req.body);
    res
      .status(201)
      .json({ status: "success", payload: "Usuario creado correctamente" });
  } catch (error) {
    next(error);
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};

module.exports = {
  formLoginUser,
  loginUser,
  formRegisterUser,
  createUser,
  logoutUser,
};
