const url = new URL(window.location.href);
const params = new URLSearchParams(url.searchParams);
let cartId = localStorage.getItem("cartId");
const selectQuantity = document.getElementById("quantity_select");

document.addEventListener("DOMContentLoaded", () => {
  setSelectedQuantity();
  createCart();
  addHrefToCart();
  cleanCart();

  document
    .querySelector("#form_updateProduct")
    ?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      send_update(evt);
    });
  document.querySelector("#create_form")?.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createProduct();
  });

  document.querySelector("#createProduct")?.addEventListener("click", () => {
    openModalCreate();
  });
});

const openModalCreate = () => {
  const miModal = new bootstrap.Modal(document.getElementById(`createModal`));
  miModal.show();
};

const openModalUpdate = async (id) => {
  const miModal = new bootstrap.Modal(document.getElementById(`updateModal`));
  miModal.show();

  const title = document.querySelector(`.card-title${id}`);
  const description = document.querySelector(`.description${id}`);
  const price = document.querySelector(`.price${id}`);

  const input_title = document.getElementById("input_title");
  const input_description = document.getElementById("input_description");
  const input_price = document.getElementById("input_price");
  const productId = document.getElementById("productId");

  input_title.value = title.innerHTML;
  input_description.value = description.innerHTML;
  input_price.value = Number(price.innerHTML.replace("$", ""));
  productId.value = id;
};

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

const send_update = async (evt) => {
  evt.preventDefault();
  const idProduct = document.querySelector(
    "#form_updateProduct input[name='productId']"
  ).value;
  const title = document.querySelector(
    "#form_updateProduct input[name='title']"
  ).value;
  const description = document.querySelector(
    "#form_updateProduct input[name='description']"
  ).value;
  const price = document.querySelector(
    "#form_updateProduct input[name='price']"
  ).value;
  const image = document.querySelector(
    "#form_updateProduct input[name='image']"
  ).value;

  await fetch(`http://localhost:3001/products/${idProduct}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image }),
  })
    .then((res) => res.json)
    .then(() => window.location.reload());
};

const createProduct = async () => {
  const title = document.querySelector("#input_create_title").value;
  const description = document.querySelector("#input_create_description").value;
  const price = document.querySelector("#input_create_price").value;
  const image = document.querySelector("#input_create_image").value;
  // const fileUpload = document.querySelector("#fileUpload");
  // const file = fileUpload.files[0];

  await fetch(`http://${window.location.host}/products`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image }),
  });
  location.reload();
};

const deleteProduct = async (id) => {
  await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => window.location.reload());
};
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
      if (!data.products.length) window.location.reload();
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
