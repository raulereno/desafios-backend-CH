const getFieldsInForm = (form) => {
  const formData = {};
  Object.keys(form).forEach((element) => {
    const field = form[element];
    const name = field.name;
    const value = field.value;

    if ((field.type === "text" || field.type === "password") && name !== "") {
      formData[name] = value;
    }
  });

  return formData;
};

document.addEventListener("DOMContentLoaded", () => {
  submitCreateForm();
  openModalCreate();
  submitUpdateForm();
});

const url = new URL(window.location.href);
const params = new URLSearchParams(url.searchParams);

const submitCreateForm = () => {
  document.querySelector("#create_form")?.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createProduct();
  });
};

const submitUpdateForm = () => {
  document
    .querySelector("#form_updateProduct")
    ?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      send_update(evt);
    });
};

const openModalCreate = () => {
  document.querySelector("#createProduct")?.addEventListener("click", () => {
    const miModal = new bootstrap.Modal(document.getElementById(`createModal`));
    miModal.show();
  });
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

  await fetch(`http://localhost:3001/products/${idProduct}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, image }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 401 && res.status === "Unauthorized") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
        });
      } else {
        window.location.reload();
      }
    });
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
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 401 && res.status === "Unauthorized") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
        });
      } else {
        window.location.reload();
      }
    });
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
    .then((res) => {
      if (res.code === 401 && res.status === "Unauthorized") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
        });
      } else {
        window.location.reload();
      }
    });
};
