const { httpServer } = require("./src/socket");

const PORT = 3001;

httpServer
  .listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
  })
  .on("error", (error) => console.log(error));
