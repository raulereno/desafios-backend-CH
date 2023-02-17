const messageSchema = require("../dao/models/message.model");
const ChatManager = require("../dao/mongoDb/chat.dao");

const chatDAO = new ChatManager("messages", messageSchema);

const getMessagesServices = async () => {
  let response = await chatDAO.getAllMessages();
  return response;
};

const addMessageServices = async (message) => {
  let response = await chatDAO.createMessage(message);
  return response;
};

module.exports = { getMessagesServices, addMessageServices };
