document.addEventListener("DOMContentLoaded", () => {
  //Añadiendo funcionalidad al boton de finalizar compra
  document
    .getElementById("purchase_products")
    .addEventListener("click", purchaseProducts);
});

const purchaseProducts = () => {
  Swal.fire({
    title:
      "Los productos que no tenemos en stock quedaran almacenados en tu carrito para más adelante, te gustaría continuar para finalizar el pago?",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonCancel: "Cancelar",
    confirmButtonText: "Continuar",
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fetch(window.location.href + "/purchase", { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            Swal.fire({
              title:
                "Revisa tu mail " +
                res.payload.purchaser +
                " para continuar con el paso final",
              html: `<p>Total: $${res.payload.amount}</p> <p>Codigo:${res.payload.code}</p> `,
              icon: "success",
            });
          }
        });
    }
  });
};
