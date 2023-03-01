const { getProductsService } = require("../services/products.service");

const getAllProducts = async (req, res) => {
  const products = await getProductsService();

  res.render("home", { style: "index.css", products: products });
};

module.exports = { getAllProducts };
