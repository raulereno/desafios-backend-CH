const {
  createCartService,
  addProductToCartService,
  getCartService,
  deleteProductInCartService,
} = require("../services/cart.service");
const { getProductsService } = require("../services/product.service");

const getCart = async (id) => {
  const cart = await getCartService(id);

  const products = await getProductsService();
  const findProducts = [];

  cart.products.forEach((productId) => {
    const product = products.find(
      (product) => product._id.toString() === productId
    );

    //Compruebo si los productos ya no han sido eliminados
    if (product) {
      findProducts.push(product);
    }
  });

  //Agrego los objetos productos en el carrito
  const formatCart = { ...cart, products: findProducts };

  console.log(formatCart);
  return formatCart;
};

const createCart = async () => {
  const newCart = await createCartService();

  return newCart;
};

const addProductToCart = async (cartId, productId) => {
  const result = await addProductToCartService(cartId, productId);

  return result;
};

const deleteProductInCart = async (cartId, productId) => {
  const result = await deleteProductInCartService(cartId, productId);

  return result;
};

module.exports = { createCart, addProductToCart, getCart, deleteProductInCart };
