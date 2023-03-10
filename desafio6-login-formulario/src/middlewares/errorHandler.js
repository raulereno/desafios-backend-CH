const handleDuplicateKeyErro = (err, res) => {
  const field = Object.keys(err.keyValue);

  res.status(409).send(`Una cuenta con ese ${field} ya existe`);
};

const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((element) => element.message);
  let fields = Object.values(err.errors).map((element) => element.path);

  if (errors.length > 1) {
    res.status(400).send({ messages: errors, fields: fields });
  }
};

const notFound = (err, res) => {
  res.status(404).send({ status: "Not Found", messages: err.message });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  try {
    if (err.code == 11000) return (err = handleDuplicateKeyErro(err, res));
    if (err.message == "Usuario inexistente") return (err = notFound(err, res));
    return (err = handleValidationError(err, res));
  } catch (error) {
    res.status(500).send("An unknown error ocurred");
  }
};

module.exports = errorHandler;
