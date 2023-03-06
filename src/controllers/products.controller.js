const {
  getProductsService,
  createManyProductsService,
  updateProductService,
  createOneProductService,
  deleteProductService,
} = require("../services/products.service");

const getAllProducts = async (req, res) => {
  const products = await getProductsService(req.query);

  res.render("home", {
    title: "Desafio - Productos",
    style: "index.css",
    products: products,
  });
};

const updateProduct = async (req, res) => {
  const result = await updateProductService(req.params, req.body);

  res.status(200).json(result);
};
const createOneProduct = async (req, res) => {
  const result = await createOneProductService(req.body);
  res.status(201).json(result);
};

const createManyProducts = async (req, res) => {
  const result = await createManyProductsService();

  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const result = await deleteProductService(req.params);

  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
};
