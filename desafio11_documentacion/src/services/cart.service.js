const CartRepository = require("../dao/repositories/cart.repository");

const cartRepository = new CartRepository();

const getCartService = async (cartId) => {
  try {
    let result = await cartRepository.getCartById(cartId);

    //Elimino todos los productos que se han borrado
    result.products = result?.products.filter(e => {
      if (e.product !== null) {
        return e
      }
    })

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
    const result = await cartRepository.deleteProductInCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteCartService = async ({ cid }) => {
  try {
    const result = await cartRepository.deleteCart(cid);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addManyProductsToCartService = async (products, { cid }) => {
  try {
    const result = await cartRepository.addManyProductsToCart(products, cid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateQuantityProductService = async ({ cid, pid }, { quantity }) => {
  try {
    const result = await cartRepository.updateQuantityProduct(cid, pid, quantity);
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
