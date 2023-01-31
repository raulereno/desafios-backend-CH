const server = require("./src/server");
const PORT = 3001;

server
  .listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
  })
  .on("error", (error) => console.log(error));
