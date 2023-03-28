const app = require("./src/server");
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server listening in PORT:${server.address().port}`);
});
