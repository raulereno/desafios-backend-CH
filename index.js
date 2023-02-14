const app = require("./src/server");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening in port:${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
