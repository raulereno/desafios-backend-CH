const ProductDAO = require("../dao/product.dao");
const productSchema = require("../models/product.model");

const productService = new ProductDAO("products", productSchema);

const getProductsService = async () => {
  try {
    const products = await productService.getAllProducts();
    return products;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductsService,
};
