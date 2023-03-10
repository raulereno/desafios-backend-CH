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
      res.send("login success");
    } else {
      res.send("login failed");
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

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  formLoginUser,
  loginUser,
  formRegisterUser,
  createUser,
};
