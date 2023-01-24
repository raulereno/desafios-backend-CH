const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "/../files/products.json");

//Devuelvo todos los productos, con o sin limitante
const allProducts = async (limit) => {
  const products = JSON.parse(
    await fs.promises
      .readFile(filePath, "utf-8")
      .then((data) => data)
      .catch((err) => {
        throw new Error(err);
      })
  );
  console.log(products);

  if (limit) {
    return products.slice(0, limit);
  }
  return products;
};
//Devuelvo un producto dado su id
const getProductById = async (pid) => {
  const products = await allProducts();

  const find = products.find((element) => element.id === Number(pid));

  if (!find) {
    throw new Error("The product with that id does not exist");
  }
  return find;
};

//Creo un producto y lo guardo en un archivo .json, haciendo comprobaciones antes de crearlo
const createProduct = async (product) => {
  const products = await allProducts();

  //Compruebo todos los campos que son requeridos
  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.stock ||
    !product.category
  ) {
    throw new Error(
      "All fields are required: title, description, code, price, stock, category"
    );
  }
  //Compruebo si no existe un producto con ese codigo
  if (products.some((element) => element.code === product.code)) {
    throw new Error("There is already a product with that code");
  }

  //Agrego el producto al array de productos, con un id y el status por default en true si es que no lo envia la petición
  products.push({
    id: products.length + 1,
    status: product.status ? product.status : true,
    ...product,
  });

  //Sobreescribo el archivo .json con el array de producto que incluye el nuevo producto
  await fs.promises.writeFile(filePath, JSON.stringify(products));

  return product;
};

const updateProduct = async (pid, modifies) => {
  const products = await allProducts();

  //Busco el producto a modificar a traves del id
  const find = products.find((element) => element.id === Number(pid));
  //Sino se encuentra lanzo una excepcion
  if (!find) {
    throw new Error("The product with that id does not exist");
  }

  //Guardo en un array las claves a modificar
  const fieldModifies = Object.keys(modifies);

  //Recorro la lista de claves a modificar y voy actualizando una por una
  fieldModifies.forEach((element) => {
    find[element] = modifies[element];
  });

  fs.promises.writeFile(filePath, JSON.stringify(products));

  return find;
};

const deleteProduct = async (pid) => {
  const products = await allProducts();

  const find = products.findIndex((element) => element.id === Number(pid));
  if (find === -1) {
    throw new Error("The product with that id does not exist");
  }

  products.splice(find, 1);

  fs.promises.writeFile(filePath, JSON.stringify(products));
};

module.exports = {
  allProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
