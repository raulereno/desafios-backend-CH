const session = require("express-session");

//Local files
const UserDAO = require("../dao/user.dao");
const userSchema = require("../models/user.model");
const { createCartService } = require("./cart.service");
const userDao = new UserDAO("User", userSchema);

const createUserService = async (user) => {
  const newCart = await createCartService();

  const newUser = await userDao.createUser(user, newCart._id);

  return newUser;
};

const getUserByUsername = async (username) => {
  const user = await userDao.getUserByUsername(username);

  return user;
};

const getUserById = async (id) => {
  const user = await userDao.getUserById(id);

  return user;
};

const loginUserService = async (user) => {
  const userInDB = await userDao.findUser(user);

  return userInDB;
};

module.exports = {
  createUserService,
  loginUserService,
  getUserByUsername,
  getUserById,
};
