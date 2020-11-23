const BalckList_Schema = require("../../Schemas/balckList_schema");

const Loger = require("../../Util/Loger");

module.exports = async (req, res, next) => {
  const reqIP = req.connection.remoteAddress;
  const ip = reqIP.replace("::ffff:", "");
  try {
    const isBlacklisted = await BalckList_Schema.findOne({ ip: ip });
    if (isBlacklisted == null) {
      next();
    } else {
      Loger.worning(`Band IP try to Login :  ${ip}`);
      res.status(500).json({ sucsses: false });
    }
  } catch (err) {
    Loger.errlog(`Error on IP Chcek`);
    console.log(err);
  }
};
