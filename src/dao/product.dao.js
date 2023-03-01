const mongoose = require("./index");

class ProductDAO {
  constructor(collection, schema) {
    this.productCollection = mongoose.model(collection, schema);
  }

  async getAllProducts() {
    const products = await this.productCollection.find();
    return products;
  }
}

module.exports = ProductDAO;
