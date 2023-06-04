const {
  createUserService,
  findUserService,
  changeRolService,
  getUserByEmailService,
  updateUserService
} = require("../services/user.service");
const { generateAuthToken, decodeAuthToken } = require("../utils/jwt");
const { sendResetPassEmail } = require("../utils/nodemailer");
const { isValidPassword, createHash } = require("../utils/passwordHash");

const formLoginUser = (req, res) => {
  res.render("login", { title: "Iniciar Sesión" });
};



const loginUser = async (req, res, next) => {
  try {
    const user = await findUserService(req.body);

    const validPassword = isValidPassword(user, req.body.password);

    if (validPassword) {
      const access_token = generateAuthToken(user.email, "12h");
      res.cookie("access_token", access_token);

      res.status(200).send({
        status: "success",
        payload: "login success",
        cartId: user.cartId,
      });
    } else {
      throw Error("Constraseña incorrecta");
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

const formRecoverPass = (req, res) => {
  const { expired } = req.query

  res.render("recover", {
    expired: expired
  })
};

const changePassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmailService(email);
    if (!user) throw Error("Usuario inexistente")

    const token = generateAuthToken(user.email, "1h")
    await sendResetPassEmail(`http://localhost:${process.env.PORT || 8080}/restorepass/${token}`, user)

    res.status(201).send({ status: "success", payload: "Link de restauración de contraseña enviado a casilla de email" })
  } catch (error) {
    next(error);
  }
}

// res.render("home", {
//   title: "Desafio - Productos",
//   style: "index.css",
//   user: user,
//   products: products,
// });

const restorePassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = decodeAuthToken(token);
    if (decoded.message?.includes("jwt expired")) {
      res.redirect(`/recover?expired=true`);
      return
    }
    res.render("restorePass", {
      title: "Restaurar Contraseña",
      style: "index.css",
      expired: false,
      token: token
    })
  } catch (error) {
    next(error);
  }
}

const sendNewPassword = async (req, res, next) => {

  try {
    const { token, newPassword } = req.body
    const decoded = decodeAuthToken(token)

    const user = await getUserByEmailService(decoded.username);

    if (isValidPassword(user, newPassword)) {
      return res.status(304).send({ status: "error", code: 304, message: "Establece una contraseña distinta a la anterior" })
    }
    user.password = createHash(newPassword)
    await updateUserService(user)
    res.status(202).send({ status: "success", code: 202, message: "Password cambiado con exito" })
  } catch (error) {
    next(error)
  }

}

const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};

const changeRol = async (req, res, next) => {
  const { uid } = req.params;

  try {
    await changeRolService(uid)
    res.redirect("/products");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  formRegisterUser,
  formLoginUser,
  formRecoverPass,
  createUser,
  loginUser,
  changePassword,
  logoutUser,
  changeRol,
  restorePassword,
  sendNewPassword
};
