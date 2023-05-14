const CartRepository = require("../dao/repositories/cart.repository");

const cartRepository = new CartRepository();

const getCartService = async (cartId) => {
  try {
    const result = await cartRepository.getCartById(cartId);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const createCartService = async () => {
  try {
    const result = await cartRepository.createCart();
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addProductToCartService = async ({ cid, pid }) => {
  try {
    const result = await cartRepository.addProductToCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductInCartService = async (cid, pid) => {
  try {
    const result = await cartServices.deleteProductInCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteCartService = async ({ cid }) => {
  try {
    const result = await cartServices.deleteCart(cid);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addManyProductsToCartService = async (products, { cid }) => {
  try {
    const result = await cartServices.addManyProductsToCart(products, cid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateQuantityProductService = async ({ cid, pid }, { quantity }) => {
  try {
    const result = await cartServices.updateQuantityProduct(cid, pid, quantity);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductInCartService,
  deleteCartService,
  addManyProductsToCartService,
  updateQuantityProductService,
};
