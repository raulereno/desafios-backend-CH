const session = require("express-session");

//Local files
const UserDAO = require("../dao/user.dao");
const userSchema = require("../models/user.model");
const { isValidPassword } = require("../utils/passwordHash");
const userDao = new UserDAO("User", userSchema);

const createUserService = async (user) => {
  const newUser = await userDao.createUser(user);

  return newUser;
};

const loginUserService = async (user) => {
  const userInDB = await userDao.findUser(user);

  return userInDB;
};

module.exports = { createUserService, loginUserService };
