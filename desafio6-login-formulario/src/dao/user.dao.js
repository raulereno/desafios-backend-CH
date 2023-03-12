const mongoose = require("mongoose");

class UserDAO {
  constructor(collection, schema) {
    this.userCollection = mongoose.model(collection, schema);
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
    //No le veo mucha seguridad a este metodo,yo lo guardaria en la bd con la password hasheada
    if (
      user.username === "adminCoder@coder.com" &&
      user.password === "adminCod3r123"
    ) {
      userInDB = this.createUser({
        ...user,
        username: "admin",
        email: user.username,
      });
    } else if (user.username.includes("@")) {
      user.email = user.username;
      delete user.username;
      userInDB = await this.userCollection.findOne({
        email: user.email,
      });
    } else {
      userInDB = await this.userCollection.findOne({
        username: user.username,
      });
    }

    if (!userInDB) throw Error("Usuario inexistente");

    return userInDB;
  }
}

module.exports = UserDAO;
