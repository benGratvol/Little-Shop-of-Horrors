const mongoose = require("mongoose");
const BlackListSchema = mongoose.Schema;

const BlackLisit = new BlackListSchema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("blacklist", BlackLisit);
