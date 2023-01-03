class ProductManager {
  products;
  idProduct = 0;

  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
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

    if (!this.products.length) {
      this.products.push(newProduct);
    } else {
      this.products.forEach((e) => {
        if (e.code === code) {
          this.idProduct--;
          console.log(`The product with code ${e.code} already exist`);
        } else {
          this.products.push(newProduct);
        }
      });
    }
  }

  getProductById(id) {
    const find = this.products.find((e) => e.id === id);

    if (find) {
      return find;
    } else {
      return "Not found";
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

let productManager = new ProductManager();

productManager.addProduct(
  "Producto De Prueba 1",
  "Esto es una prueba de un producto",
  99.99,
  "sadadsada.com",
  "b85",
  10
);

//Producto con la propiedad code repetida
productManager.addProduct(
  "Producto De Prueba 2",
  "Esto es una prueba de un producto",
  99.99,
  "sadadsada.com",
  "b85",
  10
);
//Producto con propiedades faltantes
productManager.addProduct(
  "Producto De Prueba 3",
  "Esto es una prueba de un producto",
  99.99,
  10
);

productManager.addProduct(
  "Producto De Prueba 4",
  "Esto es una prueba de un producto",
  199.99,
  "sadadsada.com",
  "b86",
  10
);

//Se intenta agregar 3 productos y solo se agregan 3 ya que uno ya existe
console.log("Todos los productos");
console.log(productManager.getProducts());

//Buscamos por id un producto
//Encontrado
console.log("Buscamos un producto por id: ");
console.log(productManager.getProductById(1));
//No encontrado
console.log("Buscamos un producto por id: ");
console.log(productManager.getProductById(20));
