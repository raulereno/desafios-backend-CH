const productSchema = require("./../../models/product.model");
const ProductDAO = require("../products.dao");

const productDao = new ProductDAO();

class ProductRepository {
  async getAllProducts(filter) {
    const result = await productDao.getAllProducts(filter);
    return result;
  }

  async getOneProduct(pid) {
    const result = await productDao.getOneProduct(pid);
    return result;
  }

  async createOneProduct(product) {
    const result = await productDao.createOneProduct(product);
    return result;
  }

  async createManyProducts(products) {
    const result = await productDao.createManyProducts(products);
    return result;
  }

  async updateProduct(pid, product) {
    const result = await productDao.updateProduct(pid, product);
    return result;
  }

  async deleteProduct(pid) {
    const result = await productDao.deleteProduct(pid);
    return result;
  }
}

module.exports = ProductRepository;
