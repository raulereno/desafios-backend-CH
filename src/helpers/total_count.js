module.exports = totalCount = (products) => {
  console.log(products);
  let sum = 0;
  products.forEach((product) => {
    sum += product.product.price * product.quantity;
  });
  return sum.toFixed(2);
};
