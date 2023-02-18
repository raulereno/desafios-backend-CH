const mongoose = require("./db");

class CartManager {
  constructor(collection, schema) {
    this.cartCollection = mongoose.model(collection, schema);
  }

  async createCart() {
    const newCart = await this.cartCollection.create({});
    return newCart;
  }

  async getCart(id) {
    let cart = await this.cartCollection.findOne({ _id: id });

    if (!cart) {
      cart = await this.cartCollection.create({ _id: id });
    }

    return cart;
  }

  async addProduct(cardId, productId) {
    const result = await this.cartCollection.updateOne(
      { _id: cardId },
      { $push: { products: productId } }
    );
    return result;
  }

  async deleteProduct(cardId, productId) {
    const result = await this.cartCollection.updateOne(
      { _id: cardId },
      { $pull: { products: productId } }
    );
    return result;
  }
}

module.exports = CartManager;
