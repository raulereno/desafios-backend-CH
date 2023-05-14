module.exports = function isAdmin(rol, options) {
  if (rol === "admin") {
    return options.fn(this);
  } else {
    return "";
  }
};
