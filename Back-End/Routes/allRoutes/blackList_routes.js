const express = require("express");
const routes = express.Router();
const BalckList_Schema = require("../../Schemas/balckList_schema");

const FormattedDate = require("../../Util/time_format");
const Loger = require("../../Util/Loger");

routes.get("/update", async (req, res) => {
  const reqIP = req.connection.remoteAddress;
  const ip = reqIP.replace("::ffff:", "");
  try {
    await newBlackList(ip).save();
    Loger.worning(`IP : ${ip} Was added to Black-List`);
    res.status(200).json({ sucsses: false, msg: `(_)_)::::::D~~~~~` });
  } catch (err) {
    Loger.errlog(err);
    console.log(err);
  }
});

routes.get("/lang", async (req, res) => {
  const reqIP = req.connection.remoteAddress;
  const ip = reqIP.replace("::ffff:", "");
  try {
    const isListed = await BalckList_Schema.findOne({ ip: ip });
    if (isListed == null) {
      res.status(200).json({ sucsses: false, msg: `EN` });
    } else {
      Loger.worning(`IP : ${ip} Was added to Black-List`);
      res.status(500).json({ sucsses: false, msg: `(_)_)::::::D~~~~~` });
    }
  } catch (err) {
    Loger.errlog(err);
    console.log(err);
  }
});

function addnewAuthorisedIP(ip) {
  const addtoBlacklist = new BalckList_Schema({
    ip: ip,
    active: true,
    createdDate: FormattedDate.HumanDate(),
  });
  return addtoBlacklist;
}

function newBlackList(ip) {
  const addtoBlacklist = new BalckList_Schema({
    ip: ip,
    active: false,
    createdDate: FormattedDate.HumanDate(),
  });
  return addtoBlacklist;
}
module.exports = routes;
