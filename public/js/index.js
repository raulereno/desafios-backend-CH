const url = new URL(window.location.href);
const params = new URLSearchParams(url.searchParams);
let cartId = localStorage.getItem("cartId");
const selectQuantity = document.getElementById("quantity_select");

document.addEventListener("DOMContentLoaded", () => {
  setSelectedQuantity();
  createCart();
  addHrefToCart();
  cleanCart();
});

const setSelectedQuantity = () => {
  if (selectQuantity) {
    const limitQuery = params.get("limit");

    const selecteLimit = document.getElementById("quantity_select");
    for (let index = 0; index < selecteLimit.options.length; index++) {
      const option = selecteLimit.options[index];
      if (option.value === limitQuery) {
        option.selected = true;
      } else if (option.value === "10" && limitQuery === null) {
        option.selected = true;
      }
    }
  }
};

if (selectQuantity) {
  selectQuantity.addEventListener("change", async (evt) => {
    const value = evt.target.value;
    const categoryQuery = params.get("query");
    const sort = params.get("sort");

    window.location.replace(
      `http://localhost:3001/products?limit=${value}${
        categoryQuery ? "&query=" + categoryQuery : ""
      }${sort ? "&sort=" + sort : ""}`
    );
  });
}

const createCart = async () => {
  if (!cartId) {
    await fetch("http://localhost:3001/cart", { method: "POST" })
      .then((result) => result.json(0))
      .then((response) => {
        localStorage.setItem("cartId", response._id);
        cartId = response._id;
      });
  }
};

const addToCart = async (pid) => {
  const cid = localStorage.getItem("cartId");

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
  }
};
const plusQuantity = (pid) => {
  const row = document.querySelector(`.product${pid}`);
  let quantity = row.querySelector(".quantity");
  quantity.innerHTML = Number(quantity.innerHTML) + 1;
};

const setQuantity = async (pid) => {
  const cid = localStorage.getItem("cartId");
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
  const cid = localStorage.getItem("cartId");

  await fetch(`http://localhost:3001/cart/${cid}/product/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.reload();
    });
};

const cleanCart = () => {
  document.getElementById("clean_cart")?.addEventListener("click", async () => {
    const cid = localStorage.getItem("cartId");

    await fetch(`http://localhost:3001/cart/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      });
  });
};

const addHrefToCart = () => {
  const linkToCart = document.getElementById("link_cart");

  linkToCart.href = `http://localhost:3001/cart/${cartId}`;
};
