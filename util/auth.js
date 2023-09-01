const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { NotAuthError } = require("./errors");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const KEY =
  process.env.KEY ||
  `[~.I,)y{/ve(wX^&DD0K+Da6nI74}7Xo'G2f"~q;$,O#n]xvh6C*.z!l:GXO~n!`;

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}
function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}
exports.checkAuthMiddleware = checkAuthMiddleware;
exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
