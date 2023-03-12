let cartId = document.cookie.split("=")[1];

console.log(cartId);
document.addEventListener("DOMContentLoaded", () => {
  cleanCart();
});

const addToCart = async (pid) => {
  console.log(pid);
  const cid = cartId;

  await fetch(`http://localhost:3001/cart/${cid}/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const minusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  if (Number(quantity.innerHTML) !== 0) {
    quantity.innerHTML = Number(quantity.innerHTML) - 1;
    setQuantity(pid);
  }
};
const plusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
  setQuantity(pid);
};

const setQuantity = async (pid) => {
  const cid = cartId;
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity").innerHTML;

  await fetch(`http://localhost:3001/cart/${cid}/product/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: Number(quantity) }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    });
};

const deleteProductInCart = async (pid) => {
  const cid = cartId;

  await fetch(`http://localhost:3001/cart/${cid}/product/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
    });
};
const cleanCart = () => {
  document.getElementById("clean_cart")?.addEventListener("click", async () => {
    const cid = cartId;

    await fetch(`http://localhost:3001/cart/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  });
};
