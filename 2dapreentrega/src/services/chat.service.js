const ChatDao = require("../dao/chat.dao");
const messageSchema = require("../models/message.model");
const chatDAO = new ChatDao("messages", messageSchema);

const getMessagesServices = async () => {
  try {
    let response = await chatDAO.getAllMessages();
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const addMessageServices = async (message) => {
  try {
    let response = await chatDAO.createMessage(message);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { getMessagesServices, addMessageServices };
