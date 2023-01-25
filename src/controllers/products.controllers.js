const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "/../files/products.json");

//Devuelvo todos los productos, con o sin limitante
const allProducts = async (limit) => {
  const products = JSON.parse(
    await fs.promises
      .readFile(filePath, "utf-8")
      .then((data) => data)
      .catch(async (err) => {
        if (err.message.includes("ENOENT: no such file or directory")) {
          await fs.promises.writeFile(filePath, JSON.stringify([]));
          return allProducts();
        }
        throw new Error(err);
      })
  );

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
  product = {
    id: products.length + 1,
    status: product.status ? product.status : true,
    ...product,
  };
  //Agrego el producto al array de productos, con un id y el status por default en true si es que no lo envia la petición
  products.push(product);

  //Sobreescribo el archivo .json con el array de producto que incluye el nuevo producto
  await fs.promises.writeFile(filePath, JSON.stringify(products));

  return product;
};

//TODO: verificar si el id es un numero
const updateProduct = async (pid, modifies) => {
  if (!Number(pid)) {
    throw new Error("The id must be a number");
  }

  const products = await allProducts();

  //Busco el producto a modificar a traves del id
  const find = products.find((element) => element.id === Number(pid));
  //Sino se encuentra lanzo una excepcion
  if (!find) {
    throw new Error("The product with that id does not exist");
  }

  //Guardo en un array las claves a modificar
  const fieldModifies = Object.keys(modifies);

  //Recorro la lista de claves a modificar y voy actualizando una por una, se contempla los caso donde se pasa un array de imagenes o una sola imagen
  fieldModifies.forEach((key) => {
    //Verifico si la key a modificar es thumbnails y si este campo es un array
    if (key === "thumbnails" && modifies[key] instanceof Array) {
      modifies[key].forEach((url) => {
        find[key].push(url);
      });
      //En este caso el instance of no funciona para los string retorna false, por eso la utilización de typeof
    } else if (key === "thumbnails" && typeof modifies[key] === "string") {
      find[key].push(modifies[key]);
    } else {
      find[key] = modifies[key];
    }
  });

  fs.promises.writeFile(filePath, JSON.stringify(products));

  return find;
};

const deleteProduct = async (pid) => {
  if (!Number(pid)) {
    throw new Error("The id must be a number");
  }

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
