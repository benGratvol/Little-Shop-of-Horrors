const jwt = require("jsonwebtoken");
const JWT_config = require("../../Configs/config").JWT;

const Loger = require("../../Util/Loger");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_config.Secret, (err, paylode) => {
    if (err) {
      res.status(500).send("Forbidden");
      const msg = `Forbidden reqwest  ${req.url}`;
      Loger.errlog(msg);
      console.log(err);
    } else {
      if (paylode.role === "admin") {
        const msg = `Admin Auth check : ${paylode.user_name} | path : ${req.url} `;
        Loger.log(msg);
        next();
      } else {
        res.status(500).send("Forbidden");
        const msg = `Forbidden reqwest  ${req.url}`;
        Loger.errlog(msg);
      }
    }
  });
};
