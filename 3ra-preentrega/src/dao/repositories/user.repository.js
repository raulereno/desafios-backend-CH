const UserDAO = require("../user.dao");
const userSchema = require("../../models/user.model");

const userDao = new UserDAO();

class UserRepository {
  async getUserByUsername(username) {
    const result = await userDao.getUserByUsername(username);
    return result;
  }

  async createUser(user, cid) {
    const result = await userDao.createUser(user, cid);
    return result;
  }

  async findUser(user) {
    const result = await userDao.findUser(user);
    return result;
  }

  async findUserByEmail(email) {
    const result = await userDao.findUserByEmail(email);
    return result;
  }
}

module.exports = UserRepository;
