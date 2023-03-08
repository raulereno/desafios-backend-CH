const mongoose = require("./index");

class ProductDAO {
  constructor(collection, schema) {
    this.productCollection = mongoose.model(collection, schema);
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
      products = await this.productCollection.paginate(setQuery, options);
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

  async createOneProduct(product) {
    const result = await this.productCollection.create(product);
    return result;
  }

  async createManyProducts(products) {
    try {
      const result = await this.productCollection.insertMany(products);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateProduct(pid, product) {
    try {
      const result = await this.productCollection.updateOne(
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
      const result = await this.productCollection.deleteOne({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductDAO;
