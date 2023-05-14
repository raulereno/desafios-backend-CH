const UserRepository = require("../dao/repositories/user.repository");

const { createCartService } = require("./cart.service");
const userRepository = new UserRepository();

const createUserService = async (user) => {
  const newCart = await createCartService();

  const newUser = await userRepository.createUser(user, newCart._id);

  return newUser;
};

const getUserByEmailService = async (email) => {
  const user = await userRepository.findUserByEmail(email);

  return user;
};

const getUserByUsername = async (username) => {
  const user = await userRepository.getUserByUsername(username);

  return user;
};

const findUserService = async (user) => {
  const userInDB = await userRepository.findUser(user);

  return userInDB;
};

module.exports = {
  createUserService,
  findUserService,
  getUserByUsername,
  getUserByEmailService,
};
