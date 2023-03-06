const mongoose = require("./index");

class ChatDao {
  constructor(collection, schema) {
    this.chatCollection = mongoose.model(collection, schema);
  }
}

module.exports = ChatDao;
