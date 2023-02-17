const productSchema = require("../dao/models/product.model");
const ProductMaganer = require("../dao/mongoDb/product.dao");

const productDAO = new ProductMaganer("products", productSchema);

const getProductsService = async () => {
  let products = await productDAO.getAllProducts();
  return products;
};

const createProductService = async (product) => {
  let response = await productDAO.createProduct(product);
  return response;
};
const updateProductService = async (id, product) => {
  let response = await productDAO.updateProduct(id, product);
  return response;
};

const deleteProductService = async (id) => {
  let response = await productDAO.deleteProduct(id);

  return response;
};

const createManyProductsService = async (products) => {
  let response = await productDAO.createManyProducts(products);
  return response;
};

module.exports = {
  getProductsService,
  createProductService,
  updateProductService,
  createManyProductsService,
  deleteProductService,
};
