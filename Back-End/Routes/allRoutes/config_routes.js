const express = require("express");
const routes = express.Router();
const AdminAuth = require("../middelwer/Admin_path_middelwer");
const UserAuth = require("../middelwer/JWT_middalwer");

const FormattedDate = require("../../Util/time_format");
const Loger = require("../../Util/Loger");

const UserSchema = require("../../Schemas/user_schema");
const SensorSchema = require("../../Schemas/sensor_schema");

routes.get("/getActivusers", AdminAuth, async (_, res) => {
  try {
    const users = await UserSchema.find(
      { isband: false, role: "user" },
      "-password -createdDate"
    );
    res.status(200).json({
      success: true,
      msg: "getUsers",
      data: users,
    });
    Loger.log(`Get user for Config`);
  } catch (err) {
    Loger.errlog(`Error on get Active user`);
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Fail To get Users",
    });
  }
});

routes.post("/addSensor", AdminAuth, async (req, res) => {
  try {
    await GenNewSensor(req.body).save();
    res.status(200).json({
      success: true,
      msg: "new Sensor Added",
    });
    Loger.log(`Susses Sensor Added`);
  } catch (err) {
    Loger.errlog(`fail to add Sensor`);
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Fail Sensor Added",
    });
  }
});

routes.post("/getSensor", UserAuth, async (req, res) => {
  try {
    const userSensor =
      req.body.role === "admin"
        ? await SensorSchema.find()
        : await SensorSchema.find({ username: req.body.user_name });
    res.status(200).json({
      success: true,
      msg: "get user Sensor",
      data: userSensor,
    });
    Loger.log(`Susses get user Sensor`);
  } catch (err) {
    Loger.errlog(`fail to get user Sensor`);
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Fail get user Sensor",
    });
  }
});

function GenNewSensor(paylode) {
  const { username, sensor_endpont, sensor_name } = paylode;
  const Sensor = new SensorSchema({
    username,
    sensor_endpont,
    sensor_name,
    createdDate: FormattedDate.HumanDate(),
  });
  return Sensor;
}

module.exports = routes;
