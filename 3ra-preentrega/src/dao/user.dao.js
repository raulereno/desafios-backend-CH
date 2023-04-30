const mongoose = require("mongoose");
const User = require("./../models/user.model");
class UserDAO {
  constructor() {
    this.userCollection = User;
  }

  async getUserByUsername(username) {
    const user = await this.userCollection
      .findOne({ username: username })
      .lean();

    return user;
  }

  async createUser(user, cid) {
    const newUser = await this.userCollection.create({ ...user, cartId: cid });

    return newUser;
  }

  async findUser(user) {
    let userInDB;

    if (user.username.includes("@")) {
      user.email = user.username;
      delete user.username;
      userInDB = await this.userCollection
        .findOne({
          email: user.email,
        })
        .lean();
    } else {
      userInDB = await this.userCollection
        .findOne({
          username: user.username,
        })
        .lean();
    }

    if (!userInDB) throw Error("Usuario inexistente");

    return userInDB;
  }

  async findUserByEmail(email) {
    const user = this.userCollection.findOne({ email: email }).lean();

    return user;
  }
}

module.exports = UserDAO;
