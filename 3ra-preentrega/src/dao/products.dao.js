const ProductDto = require("./DTOs/product.dto");
const Product = require("./../models/product.model");
class ProductDAO {
  constructor() {
    this.productsCollection = Product;
  }

  async getAllProducts({ limit, page, query, sort }) {
    if (sort !== "asc" && sort !== "desc") {
      sort = undefined;
    }
    let products;
    const setLimit = limit ? limit : 10;
    const setPage = page ? Number(page) : 1;
    const setSort = sort ? { price: sort } : {};

    const setQuery = query ? { category: query } : {};
    const setStringQuery = query ? "&query=" + query : "";

    const options = {
      lean: true,
      limit: setLimit,
      page: setPage,
      sort: setSort,
    };
    try {
      products = await this.productsCollection.paginate(setQuery, options);
    } catch (error) {
      throw Error(error);
    }

    const myCustomLabels = {
      prevLink: products.hasPrevPage
        ? `http://localhost:3001/products?page=${
            setPage - 1
          }&limit=${setLimit}${setStringQuery}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:3001/products?page=${
            setPage + 1
          }&limit=${setLimit}${setStringQuery}`
        : null,
    };

    return { ...products, ...myCustomLabels, query: query, sort: sort };
  }

  async getOneProduct(pid) {
    const product = await this.productsCollection.findById(pid);
    return product;
  }

  async createOneProduct(product) {
    const { title, description, price, image, category, stock } = product;
    const newProduct = new ProductDto(
      title,
      description,
      price,
      stock,
      category,
      image
    );
    const result = await this.productsCollection.create(newProduct);
    return result;
  }

  async createManyProducts(products) {
    console.log(products);
    try {
      const newProducts = products.map((product) => {
        const { title, description, price, image, category, stock } = product;
        return new ProductDto(
          title,
          description,
          price,
          stock,
          category,
          image
        );
      });

      const result = await this.productsCollection.insertMany(newProducts);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateProduct(pid, product) {
    try {
      const result = await this.productsCollection.updateOne(
        { _id: pid },
        product
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(pid) {
    try {
      const result = await this.productsCollection.deleteOne({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductDAO;
