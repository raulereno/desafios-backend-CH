const fs = require("fs");
const path = require("path");

const pathFiles = path.join(__dirname + "/../files/products.json");

const getProducts = async () => {
  return JSON.parse(await fs.promises.readFile(`${pathFiles}`, "utf-8"));
};

const addProduct = async (product) => {
  let products = await getProducts();
  const newProduct = {
    ...product,
    id: products.length + 1,
  };

  products.unshift(newProduct);

  await fs.promises.writeFile(pathFiles, JSON.stringify(products));

  return newProduct;
};

const deleteProduct = async (id) => {
  let products = await getProducts();

  products = products.filter((product) => product.id !== Number(id));
  await fs.promises.writeFile(pathFiles, JSON.stringify(products));
};

module.exports = { getProducts, addProduct, deleteProduct };
