const {
  getProductsService,
  createManyProductsService,
} = require("../services/products.service");

const getAllProducts = async (req, res) => {
  const products = await getProductsService(req.query);

  console.log(products);
  res.render("home", {
    title: "Desafio - Productos",
    style: "index.css",
    products: products,
  });
};

const createOneProduct = async (req, res) => {};

const createManyProducts = async (req, res) => {
  const products = req.body;

  const result = await createManyProductsService(products);

  return res.status(200).json(result);
};

module.exports = { getAllProducts, createOneProduct, createManyProducts };
