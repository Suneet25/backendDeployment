var jwt = require("jsonwebtoken");

let authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        // console.log(decoded);
        req.body.user = decoded.userId;
        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = { authenticate };
