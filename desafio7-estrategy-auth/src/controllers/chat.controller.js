const getAllMessages = async (req, res) => {
  const user = req.session?.user;

  res.render("chat", {
    title: "Desafio - Chat",
    style: "index.css",
    user: user,
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
