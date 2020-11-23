const mongoose = require("mongoose");
const sensorSchema = mongoose.Schema;
const sensor = new sensorSchema({
  username: {
    type: String,
    required: true,
  },
  sensor_endpont: {
    type: String,
    required: true,
  },
  sensor_name: {
    type: String,
    required: true,
  },

  createdDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sensor", sensor);
