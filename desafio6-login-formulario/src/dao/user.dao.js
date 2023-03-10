const mongoose = require("mongoose");

class UserDAO {
  constructor(collection, schema) {
    this.userCollection = mongoose.model(collection, schema);
  }

  async createUser(user) {
    const newUser = await this.userCollection.create(user);

    return newUser;
  }

  async findUser(user) {
    const userInDB = await this.userCollection.findOne({
      username: user.username,
    });

    if (!userInDB) throw Error("Usuario inexistente");

    return userInDB;
  }
}

module.exports = UserDAO;
