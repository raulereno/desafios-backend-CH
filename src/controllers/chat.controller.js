const {
  getMessagesServices,
  addMessageServices,
} = require("../services/chat.service");

const getMessages = async () => {
  const messages = await getMessagesServices();

  return messages;
};

const addMessages = async (message) => {
  if (!message.user || !message.message) throw Error("Fields missing");
  const result = await addMessageServices(message);
  return result;
};

module.exports = { getMessages, addMessages };
