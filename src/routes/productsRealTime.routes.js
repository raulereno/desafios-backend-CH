const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("realtimeproducts", { style: "index.css" });
});

router.post("/", async (req, res) => {
  require("./../socket").emitProducts(req.body);
  res.end();
});

router.delete("/:id", (req, res) => {
  require("./../socket").deleteProduct(req.params.id);
  res.end();
});

module.exports = {
  router,
};
