const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.idProduct = 0;
  }

  async getProducts() {
    let file = await fs.promises
      .readFile(`${this.path}/files/products.json`, "utf-8")
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
      ++this.idProduct
    );

    let products = await this.getProducts();

    if (!products.length) {
      await fs.promises.writeFile(
        `${this.path}/files/products.json`,
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
          `${this.path}/files/products.json`,
          JSON.stringify(products)
        );
        console.log("Producto agregado correctamente");
      }
    }
  }

  async getProductById(id) {
    let products = await this.getProducts();

    let finded = products.find((product) => product.id === id);

    if (finded) {
      return finded;
    } else {
      return `No se encontro ningún producto con el id ${id}`;
    }
  }

  async updateProduct(id, key, value) {
    let products = await this.getProducts();

    let finded = products.find((product) => product.id === id);

    if (finded) {
      finded[key] = value;
      await fs.promises.writeFile(
        `${this.path}/files/products.json`,
        JSON.stringify(products)
      );
    }
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    let finded = products.findIndex((product) => product.id === id);
    if (finded !== -1) {
      products.splice(finded, 1);

      let aux = 1;
      let formatIdProducts = products.map((product) => {
        product.id = aux;
        aux++;
        return product;
      });
      await fs.promises.writeFile(
        `${this.path}/files/products.json`,
        JSON.stringify(formatIdProducts)
      );
    } else {
      console.log(`No existe un producto con el id ${id}`);
    }
  }
}

class Product {
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;

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

//Utilizo una función autoejecutable asincronica por el hecho de trabajar con el filesystem asyncronicamente sino se utiliza el await en estos metodos no funciona correctamente el script
(async () => {
  //Creo una nueva instancia de product manager pasandole la ruta actual en la cual estoy trabajando
  const productManager = new ProductManager(__dirname);

  console.log("\n");
  console.log("Todavia no hay productos:");
  console.log(await productManager.getProducts());
  console.log("\n");

  //Agredo dos productos
  await productManager.addProduct(
    "Producto De Prueba 1",
    "Esto es una prueba de un producto",
    99.99,
    "https://picsum.photos/200/300",
    "b70",
    8
  );

  await productManager.addProduct(
    "Producto De Prueba 2",
    "Esto es una prueba de un producto totalmente diferente",
    50,
    "https://picsum.photos/200/300",
    "b85",
    10
  );
  console.log("\n");
  //Muestro los productos
  console.log("Productos en mi archivo:");
  console.log(await productManager.getProducts());

  console.log("\n");
  //Busqueda de productos utilizando el metodo de la clase
  console.log("Busco el producto con el id 2:");
  console.log(await productManager.getProductById(2));
  console.log("\n");
  console.log("Busco el producto con el id 5:");
  console.log(await productManager.getProductById(5));
  console.log("\n");

  //Actualizo un producto
  console.log("Actualizo el precio del producto con el id 1");
  await productManager.updateProduct(1, "price", 200);

  //Muestro que se modifico satisfactoriamente el producto
  console.log("\n");
  console.log("El producto se actualizo:");
  console.log(await productManager.getProducts());
  console.log("\n");

  //Elimino un producto con id que no existe y despues elimino un producto existente
  console.log("Trato de eliminar un producto con id 3:");
  await productManager.deleteProduct(3);
  console.log("\n");
  console.log(
    "Elimino el producto con el id 1, con esto se formatean los id's"
  );
  await productManager.deleteProduct(1);
  console.log("\n");

  //Muestro como quedo mi archivo de productos
  console.log(
    "Despues de eliminar el producto con el id 2 queda un solo producto en el archivo:"
  );
  console.log(await productManager.getProducts());
})();
