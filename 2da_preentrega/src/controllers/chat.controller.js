const getAllMessages = (req, res) => {
  res.render("chat", {
    title: "Desafio - Chat",
    style: "index.css",
  });
};

module.exports = {
  getAllMessages,
};
