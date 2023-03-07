const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.idProduct = 0;
  }

  async getProducts() {
    let file = await fs.promises
      .readFile(`${this.path}/products.json`, "utf-8")
      .then((data) => {
        return JSON.parse(data);
      })
      .catch((err) => {
        return [];
      });

    return file;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    //Compruebo si todos los campos son ingresados
    let products = await this.getProducts();
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("All fields are required");
      return;
    }

    let newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      products.length + 1
    );

    let find = products.some((element) => element.code === newProduct.code);

    if (find) {
      console.log("No puede haber dos productos con el mismo codigo");
      return;
    }

    if (!products.length) {
      await fs.promises.writeFile(
        `${this.path}/products.json`,
        JSON.stringify([newProduct])
      );
      console.log("Producto agregado correctamente");
    } else {
      let verify = products.some(
        (product) => product.title === newProduct.title
      );

      if (verify) {
        console.error("A product with that title already exists.");
      } else {
        products.push(newProduct);
        await fs.promises.writeFile(
          `${this.path}/products.json`,
          JSON.stringify(products)
        );
        console.log("Producto agregado correctamente");
      }
    }
  }

  async getProductById(id) {
    let products = await this.getProducts();
    let finded = products.find((product) => product.id === Number(id));

    if (finded) {
      return finded;
    } else {
      throw new Error(`No se encontro ningún producto con el id ${id}`);
    }
  }

  async updateProduct(id, key, value) {
    let products = await this.getProducts();

    let finded = products.find((product) => product.id === id);

    if (finded) {
      finded[key] = value;
      await fs.promises.writeFile(
        `${this.path}/products.json`,
        JSON.stringify(products)
      );
    }
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    let finded = products.findIndex((product) => product.id === id);
    if (finded !== -1) {
      products.splice(finded, 1);

      await fs.promises.writeFile(
        `${this.path}/products.json`,
        JSON.stringify(products)
      );
    } else {
      console.log(`No existe un producto con el id ${id}`);
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock, id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

const productManager = new ProductManager(__dirname);

//Utilizo una función autoejecutable asincronica por el hecho de trabajar con el filesystem asyncronicamente sino se utiliza el await en estos metodos no funciona correctamente el script
// (async () => {
//   //Creo una nueva instancia de product manager pasandole la ruta actual en la cual estoy trabajando
//   const productManager = new ProductManager(__dirname);

//   console.log("\n");
//   console.log("Todavia no hay productos:");
//   console.log(await productManager.getProducts());
//   console.log("\n");

//   await productManager.addProduct(
//     "Nimbus 2000",
//     "The fastest flying broom in the market",
//     300.5,
//     "https://i.ytimg.com/vi/9kND8PSBIYM/maxresdefault.jpg",
//     "b70",
//     8
//   );

//   await productManager.addProduct(
//     "Time-Turner",
//     "A Time-Turner was a magical device used for time travel.",
//     500.99,
//     "https://static.wikia.nocookie.net/harrypotter/images/a/a4/Time_Turner.png/revision/latest/scale-to-width-down/350?cb=20161126042527",
//     "b85",
//     1
//   );
//   await productManager.addProduct(
//     "Mandrake",
//     "Magical and sentient plant which had a root that looked like a human",
//     50,
//     "https://i.pinimg.com/736x/3c/b1/89/3cb1892dc59f4d0af8f33bd4861469bd--plants-in-pots-harry-potter.jpg",
//     "p11",
//     20
//   );
//   await productManager.addProduct(
//     "Bertie Bott's Every Flavo",
//     "There was also no way of telling for sure what flavour any given bean was without tasting it, although you could try and guess by the colour.",
//     40.99,
//     "https://static.wikia.nocookie.net/harrypotter/images/6/60/Bertie_Botts_EFB.png/revision/latest/scale-to-width-down/341?cb=20161128010133",
//     "s113",
//     30
//   );
//   await productManager.addProduct(
//     "Cloak of invisibility",
//     "A cloak of invisibility is an item that prevents the wearer from being seen. One of the Deathly Hallows",
//     1500,
//     "https://static.wikia.nocookie.net/esharrypotter/images/2/23/Capa_de_invisibilidad_PM.png/revision/latest/scale-to-width-down/1200?cb=20180112163535",
//     "dh1",
//     1
//   );
// })();

module.exports = productManager;
