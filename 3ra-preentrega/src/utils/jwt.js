const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "coderSecret";

function generateAuthToken(email) {
  try {
    const token = jwt.sign({ username: email }, PRIVATE_KEY, {
      expiresIn: "12h",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
}

function decodeAuthToken(token) {
  try {
    const decode = jwt.verify(token, PRIVATE_KEY);

    return decode;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateAuthToken, decodeAuthToken };
