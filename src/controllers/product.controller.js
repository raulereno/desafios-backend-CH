const {
  getProductsService,
  createProductService,
  updateProductService,
  createManyProductsService,
  deleteProductService,
} = require("../services/product.service");

const getProducts = async () => {
  let products = await getProductsService();
  return products.reverse();
};

const createProduct = async (product) => {
  console.log(product);
  if (!product.image.length) delete product.image;

  if (!product.title || !product.price) throw Error("Fields missing");

  let result = await createProductService(product);

  return result;
};

const updateProduct = async (id, productUpdated) => {
  //Sino se especifica imagen eliminamos el campo para que no lo modifique con un string vacio
  if (!productUpdated.image) delete productUpdated.image;

  let result = await updateProductService(id, productUpdated);

  return result;
};

const deleteProduct = async (id) => {
  let result = await deleteProductService(id);

  return result;
};

const createManyProducts = async (products) => {
  let result = await createManyProductsService(products);

  return result;
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  createManyProducts,
  deleteProduct,
};
