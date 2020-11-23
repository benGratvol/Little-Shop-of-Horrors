const jwt = require("jsonwebtoken");
const JWT_config = require("../../Configs/config").JWT;
const Loger = require("../../Util/Loger");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_config.Secret, function(err, payload) {
    if (payload) {
      const msg = `Auth check user : ${payload.user_name} role : ${payload.role} path : ${req.url}`;
      Loger.log(msg);
      next();
    } else {
      res.status(403).send("Forbidden");
      const reqIP = req.connection.remoteAddress;
      const msg = `Auth Fail check from ip : ${reqIP} path : ${req.url}`;
      Loger.errlog(msg);
    }
  });
};
