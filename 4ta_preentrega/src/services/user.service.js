const UserRepository = require("../dao/repositories/user.repository");

const { createCartService } = require("./cart.service");
const userRepository = new UserRepository();

const createUserService = async (user) => {
  try {
    const newCart = await createCartService();
    const newUser = await userRepository.createUser(user, newCart._id);
    return newUser;
  } catch (error) {
    throw Error(error)
  }
};

const updateUserService = (user) => {
  try {
    return userRepository.updateUser(user);
  } catch (error) {
    throw Error(error)
  }
}


const getUserByEmailService = async (email) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    return user;
  } catch (error) {
    throw Error(error)
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await userRepository.getUserByUsername(username);
    return user;
  } catch (error) {
    throw Error(error)
  }
};

const findUserService = async (user) => {
  try {
    const userInDB = await userRepository.findUser(user);
    return userInDB;
  } catch (error) {
    throw Error(error)
  }
};

const loginLogoutUserService = async (user) => {
  try {
    const userInDB = await userRepository.findUser(user);

    userInDB.last_connection = new Date(Date.now())

    await userRepository.updateUser(userInDB)

    return userInDB;
  } catch (error) {
    throw Error(error)
  }
};

const changeRolService = async (uid) => {
  try {
    const user = await userRepository.changeRol(uid);
    return user
  } catch (error) {
    throw Error(error)
  }
}

module.exports = {
  createUserService,
  findUserService,
  getUserByUsername,
  getUserByEmailService,
  changeRolService,
  updateUserService,
  loginLogoutUserService
};
