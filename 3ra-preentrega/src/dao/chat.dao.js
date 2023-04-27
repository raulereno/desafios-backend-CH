const mongoose = require("mongoose");
const MessageDto = require("./DTOs/message.dto");

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
      let newMessage = new MessageDto(message);
      let result = await this.chatCollection.create(newMessage);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = ChatDao;
