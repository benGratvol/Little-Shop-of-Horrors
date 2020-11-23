const express = require("express");

const routes = express.Router();

const FormattedDate = require("../../Util/time_format");
const Loger = require("../../Util/Loger");

const UserSchema = require("../../Schemas/user_schema");

const AdminAuth = require("../middelwer/Admin_path_middelwer");

routes.post("/regester", AdminAuth, async (req, res) => {
  try {
    const user = await NewUser(req.body).save();
    res.status(200).json({ sucsses: true, msg: "new user Creater" });
    Loger.log("new user Creater");
  } catch (err) {
    if (err.code === 11000) {
      res.status(200).json({ sucsses: false, msg: "user Exists" });
    } else {
      Loger.errlog("Error on createUser");
      console.log(err);
      res.status(500).json({ sucsses: false, msg: "fail" });
    }
  }
});

routes.get("/users", AdminAuth, async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json({ sucsses: true, msg: "users", data: users });
    Loger.log("get users");
  } catch (err) {
    Loger.errlog("Error on createUser");
    console.log(err);
    res.status(500).json({ sucsses: false, msg: "fail" });
  }
});

routes.put("/ban-user", AdminAuth, async (req, res) => {
  const { _id, isband } = req.body;

  try {
    await UserSchema.findOneAndUpdate(
      { _id },
      { isband: !isband },
      { upsert: true }
    );
    res.status(200).json({ sucsses: true, msg: "Ban Status Update" });
    Loger.log(`User : ${_id} Status Updated `);
  } catch (err) {
    res.status(500).json({ sucsses: false, msg: "Error on ban-user" });
    Loger.errlog(`Error on ban-useer`);
    console.log(err);
  }
});

function NewUser(paylode) {
  const { username, password, role } = paylode;
  const NewUser = new UserSchema({
    user_name: username,
    password: password,
    role: role,
    isband: false,
    createdDate: FormattedDate.HumanDate(),
  });
  return NewUser;
}
module.exports = routes;
