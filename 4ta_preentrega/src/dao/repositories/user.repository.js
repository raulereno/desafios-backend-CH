const UserDAO = require("../user.dao");
const userSchema = require("../../models/user.model");

const userDao = new UserDAO();

class UserRepository {
  async getUserByUsername(username) {
    try {
      const result = await userDao.getUserByUsername(username);
      return result;
    } catch (error) {
      throw Error(error)
    }

  }

  async createUser(user, cid) {
    try {
      const result = await userDao.createUser(user, cid);
      return result;
    } catch (error) {
      throw Error(error)
    }
  }

  async findUser(user) {
    try {
      const result = await userDao.findUser(user);
      return result;
    } catch (error) {
      throw Error(error)
    }
  }



  async findUserByEmail(email) {
    try {
      const result = await userDao.findUserByEmail(email);
      return result;
    } catch (error) {
      throw Error(error)
    }
  }

  async updateUser(user) {
    try {
      const result = await userDao.updateUser(user);
      return result;
    } catch (error) {
      throw Error(error)
    }
  }

  async changeRol(uid) {
    try {
      const result = await userDao.changeRol(uid);
      return result;
    } catch (error) {
      throw Error(error)
    }
  }

}

module.exports = UserRepository;
