const products = require("../../products");
const ProductRepository = require("../dao/repositories/product.repository");

const productRepository = new ProductRepository();

const getProductsService = async (filters) => {
  try {
    const products = await productRepository.getAllProducts(filters);
    return products;
  } catch (error) {
    throw Error(error);
  }
};

const getOneProductService = async (pid) => {
  try {
    const product = await productRepository.getOneProduct(pid);
    return product;
  } catch (error) {
    throw Error(error);
  }
};

const createProductService = async (product) => {
  try {
    const products = await productRepository.createProduct(product);
    return products;
  } catch (error) {
    throw Error(error);
  }
};
const createManyProductsService = async () => {
  try {
    const result = await productRepository.createManyProducts(products);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateProductService = async ({ pid }, product) => {
  try {
    if (!product.image) delete product.image;
    const result = await productRepository.updateProduct(pid, product);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const createOneProductService = async (product) => {
  try {
    const result = await productRepository.createOneProduct(product);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
const deleteProductService = async ({ pid }) => {
  try {
    const result = await productRepository.deleteProduct(pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductsService,
  getOneProductService,
  createProductService,
  createManyProductsService,
  updateProductService,
  createOneProductService,
  deleteProductService,
};
