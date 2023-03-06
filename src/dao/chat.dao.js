const mongoose = require("./index");

class ChatDao {
  constructor(collection, schema) {
    this.chatCollection = mongoose.model(collection, schema);
  }

  async getAllMessages() {
    try {
      let messages = await this.chatCollection.find().lean();
      return messages;
    } catch (error) {
      throw Error(error);
    }
  }

  async createMessage(message) {
    try {
      let result = await this.chatCollection.create(message);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = ChatDao;
