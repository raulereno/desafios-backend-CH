const {
  getProductsService,
  updateProductService,
  createOneProductService,
  createManyProductsService,
  deleteProductService,
} = require("../services/products.service");
const { findUserService } = require("../services/user.service");

const getAllProducts = async (req, res) => {
  const products = await getProductsService(req.query);
  const user = await findUserService(req.user);

  res.render("home", {
    title: "Desafio - Productos",
    style: "index.css",
    user: user,
    products: products,
  });
};

const getOneProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params, req.body);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params, req.body);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};
const createOneProduct = async (req, res, next) => {
  try {
    const result = await createOneProductService(req.body);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    next(error);
  }
};

const createManyProducts = async (req, res) => {
  try {
    const result = await createManyProductsService();
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params);
    res.status(200).json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).send({ status: "error", payload: error.message });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
};
