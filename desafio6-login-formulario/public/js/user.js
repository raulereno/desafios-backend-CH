document.addEventListener("DOMContentLoaded", () => {
  submitRegisterForm();
  submitLoginForm();
});
const submitRegisterForm = () => {
  document
    .getElementById("register_form")
    ?.addEventListener("submit", (evt) => {
      evt.preventDefault();

      console.log(evt);
    });
};
const submitLoginForm = () => {
  document
    .getElementById("login_form")
    ?.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const formData = {};

      Object.keys(evt.target).forEach((element) => {
        const field = evt.target[element];
        const name = field.name;
        const value = field.value;

        if (field.type === "text") {
          formData[name] = value;
        }
      });

      await fetch(window.location.href, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            throw new Error(res.status);
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    });
};
