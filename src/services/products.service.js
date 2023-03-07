const products = require("../../products");
const ProductDAO = require("../dao/product.dao");
const productSchema = require("../models/product.model");

const productDao = new ProductDAO("Product", productSchema);

const getProductsService = async (filters) => {
  try {
    const products = await productDao.getAllProducts(filters);
    return products;
  } catch (error) {
    throw Error(error);
  }
};

const createProductService = async (product) => {
  try {
    const products = await productDao.createProduct(product);
    return products;
  } catch (error) {
    throw Error(error);
  }
};
const createManyProductsService = async () => {
  try {
    const result = await productDao.createManyProducts(products);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateProductService = async ({ pid }, product) => {
  try {
    if (!product.image) delete product.image;
    const result = await productDao.updateProduct(pid, product);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const createOneProductService = async (product) => {
  try {
    const result = await productDao.createOneProduct(product);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
const deleteProductService = async ({ pid }) => {
  try {
    const result = await productDao.deleteProduct(pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductsService,
  createProductService,
  createManyProductsService,
  updateProductService,
  createOneProductService,
  deleteProductService,
};
