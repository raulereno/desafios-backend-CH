const fs = require("fs");
const path = require("path");
const { allProducts } = require("./products.controllers");

// if (err.message.includes("ENOENT: no such file or directory")) {
//     fs.promises.writeFile(filePath, JSON.stringify([]));
//   }

const filePath = path.join(__dirname + "/../files/carts.json");

const allCarts = async () => {
  const carts = await fs.promises
    .readFile(filePath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(async (err) => {
      //Si existe el error de que el archivo se haya borrado por alguna razon lo crea y retornamos la misma función para que devuelva un array vacio
      if (err.message.includes("ENOENT: no such file or directory")) {
        await fs.promises.writeFile(filePath, JSON.stringify([]));
        return allCarts();
      }
    });

  return carts;
};

const getCart = async (cid) => {
  //Compruebo que el id ingresado sea un numero
  if (!Number(cid)) {
    throw new Error("The id must be a number");
  }

  //Recupero todos los carritos existentes y busco por el id
  const carts = await allCarts();
  const find = carts.find((element) => element.id === Number(cid));

  //Si el carrito no se encuentra retorno una excepción
  if (!find) {
    throw new Error(`The cart with id ${cid} does not exist`);
  }

  return find.products;
};

const createCart = async (cart) => {
  const carts = await allCarts();

  carts.push({
    id: carts.length + 1,
    //Si recibe una request sin la propiedad products la crea con un array vacio
    products: cart.products ? cart.products : [],
  });

  fs.promises.writeFile(filePath, JSON.stringify(carts));
};

const addProductToCart = async (cid, pid, quantity) => {
  //No implemento else en estos caso porque en todos los if que entraria se cortaria la ejecución de la función

  //Compruebo que los id's recibidos sean un numero antes de ejecutar codigo
  if (!Number(cid)) {
    throw new Error("The id of the cart must be a number");
  } else if (!Number(pid)) {
    throw new Error("The id of the product must be a number");
  }

  //En este caso sino existe el carrito indicado por id no se puede agregar el producto
  const carts = await allCarts();
  const findCart = carts.find((element) => element.id === Number(cid));
  if (!findCart) {
    throw new Error(`The cart with id ${cid} does not exist`);
  }

  const products = await allProducts();
  const findProduct = products.find((element) => element.id === Number(pid));
  if (!findProduct) {
    throw new Error(`The product with id ${pid} does not exist`);
  }

  const findProductInCart = findCart.products.find(
    (element) => element.pid === findProduct.id
  );

  if (findProductInCart) {
    findProductInCart.quantity++;
  } else {
    findCart.products.push({ pid: findProduct.id, quantity: quantity });
  }

  await fs.promises.writeFile(filePath, JSON.stringify(carts));
};

module.exports = { createCart, getCart, addProductToCart };
