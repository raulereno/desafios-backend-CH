const UserDAO = require("../dao/user.dao");
const userSchema = require("../models/user.model");
const { createCartService } = require("./cart.service");
const userDao = new UserDAO("User", userSchema);

const createUserService = async (user) => {
  const newCart = await createCartService();

  const newUser = await userDao.createUser(user, newCart._id);

  return newUser;
};

const getUserByEmailService = async (email) => {
  const user = await userDao.findUserByEmail(email);

  return user;
};

const getUserByUsername = async (username) => {
  const user = await userDao.getUserByUsername(username);

  return user;
};

const findUserService = async (user) => {
  const userInDB = await userDao.findUser(user);

  return userInDB;
};

module.exports = {
  createUserService,
  findUserService,
  getUserByUsername,
  getUserByEmailService,
};
