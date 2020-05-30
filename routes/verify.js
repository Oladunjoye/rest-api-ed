const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) res.status(401).send("Unauthorized user, access denied");

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verify;
