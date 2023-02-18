document.addEventListener("DOMContentLoaded", async () => {
  await createCart();

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

//-----Home----Products Functions
const deleteProduct = async (id) => {
  await fetch(`${window.location.href}/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  location.reload();
};

const openModalCreate = () => {
  const miModal = new bootstrap.Modal(document.getElementById(`createModal`));
  miModal.show();
};

const createProduct = async () => {
  const title = document.querySelector("#input_create_title").value;
  const description = document.querySelector("#input_create_description").value;
  const price = document.querySelector("#input_create_price").value;
  const image = document.querySelector("#input_create_image").value;
  // const fileUpload = document.querySelector("#fileUpload");
  // const file = fileUpload.files[0];

  await fetch(`${window.location.href}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image }),
  });
  location.reload();
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

  await fetch(`${window.location.href}/${idProduct}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image }),
  });

  location.reload();
};
//-----Cart----Cart Functions
const createCart = async () => {
  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
    await fetch(`http://localhost:3001/cart`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        localStorage.setItem("cartId", data.payload._id);
      });
  }

  const linkToCart = document.querySelector("#link_cart");

  linkToCart.href = `/cart?cartid=${cartId}`;
};

const addToCart = async (id) => {
  const cartId = localStorage.getItem("cartId");
  await fetch(`http://${window.location.host}/cart/addProduct`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId: cartId,
      productId: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const toastLiveExample = document.getElementById("liveToast");

      const toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    });
};

const deleteProductInCart = async (id) => {
  const cartId = localStorage.getItem("cartId");

  await fetch(`http://${window.location.host}/cart/deleteProduct`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId: cartId,
      productId: id,
    }),
  });
  location.reload();
};
