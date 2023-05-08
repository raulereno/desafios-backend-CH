const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);

  res.status(409).send({
    status: "error",
    message: `Una cuenta con ese ${field} ya existe`,
    code: 409,
  });
};

const handleValidationError = (err, res) => {
  const bodyError = JSON.parse(err.message);

  console.log(bodyError);

  return res.status(400).send({ code: 400, ...bodyError });
};

const notFound = (err, res) => {
  res.status(404).send({
    status: "Not found",
    message: err.message,
    code: 404,
  });
};

const invalidCredentials = (err, res) => {
  res.status(403).send({
    status: "Error",
    message: err.message,
    code: 403,
  });
};

const errorHandler = (err, req, res, next) => {
  // console.log(err.message);

  try {
    if (err.code == 11000) {
      return (err = handleDuplicateKeyError(err, res));
    }
    if (err.message == "Usuario inexistente") {
      return (err = notFound(err, res));
    }
    if (err.message == "Constraseña incorrecta") {
      return (err = invalidCredentials(err, res));
    }
    return (err = handleValidationError(err, res));
  } catch (error) {
    res.status(500).send("An unknown error ocurred");
  }
};

module.exports = errorHandler;
