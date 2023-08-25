const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { NotAuthError } = require("./errors");

const KEY = `[~.I,)y{/ve(wX^&DD0K+Da6nI74}7Xo'G2f"~q;$,O#n]xvh6C*.z!l:GXO~n!`;

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;