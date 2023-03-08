const getAllMessages = (req, res) => {
  res.render("chat", {
    title: "Desafio - Chat",
    style: "index.css",
  });
};

const addMessages = async (req, res) => {
  await require("../socket").addMessagesSocket(req.body);
  res.send({ status: "success", payload: "Message Added" });
};

module.exports = {
  getAllMessages,
  addMessages,
};
