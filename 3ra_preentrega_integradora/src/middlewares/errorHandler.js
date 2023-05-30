const handleDuplicateKeyError = (err, req, res) => {
  const field = Object.keys(err.keyValue);

  req.logger.warning(`Una cuenta con ese ${field} ya existe`)

  res.status(409).send({
    status: "error",
    message: `Una cuenta con ese ${field} ya existe`,
    code: 409,
  });
};

const handleValidationError = (err, req, res) => {
  const bodyError = JSON.parse(err.message);

  req.logger.warning(bodyError)

  return res.status(400).send({ code: 400, ...bodyError });
};

const notFound = (err, req, res) => {
  req.logger.warning("Usuario no encontrado")

  res.status(404).send({
    status: "Not found",
    message: err.message,
    code: 404,
  });
};

const invalidCredentials = (err, req, res) => {

  req.logger.warning("Credenciales del usuario invalidas")

  res.status(403).send({
    status: "Error",
    message: err.message,
    code: 403,
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  try {
    if (err.code == 11000) {
      return (err = handleDuplicateKeyError(err, req, res));
    }
    if (err.message?.includes("Usuario inexistente")) {
      return (err = notFound(err, req, res));
    }
    if (err.message == "Constraseña incorrecta") {
      return (err = invalidCredentials(err, req, res));
    }
    return (err = handleValidationError(err, req, res));
  } catch (error) {
    req.logger.error(`Un error no manejado a ocurrido: ${err.message}`)
    res.status(500).send("An unknown error ocurred");
  }
};

module.exports = errorHandler;
