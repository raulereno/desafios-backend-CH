const ProductDAO = require("../dao/product.dao");
const productSchema = require("../models/product.model");

const productService = new ProductDAO("Product", productSchema);

const getProductsService = async (filters) => {
  try {
    const products = await productService.getAllProducts(filters);

    return products;
  } catch (error) {
    throw Error(error);
  }
};

const createProductService = async (product) => {
  try {
    const products = await productService.createProduct(product);
    return products;
  } catch (error) {
    throw Error(error);
  }
};
const createManyProductsService = async (products) => {
  try {
    const result = await productService.createManyProducts(products);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductsService,
  createProductService,
  createManyProductsService,
};
