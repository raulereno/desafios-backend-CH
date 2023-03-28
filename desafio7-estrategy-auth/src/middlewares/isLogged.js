const { getUserByUsername } = require("../services/user.service");

const isLogged = async (req, res, next) => {
  const user = await getUserByUsername(req.session?.user?.username);
  if (user || req.session.user?.email === process.env.ADMIN_USER) {
    //Genera un bucle
    // if (["/login", "/register"].includes(req.url)) {
    //   res.redirect("/");
    // }
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isLogged;
