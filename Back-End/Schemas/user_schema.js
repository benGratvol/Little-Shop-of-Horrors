const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userScheman = mongoose.Schema;

const User = new userScheman({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isband: {
    type: Boolean,
    required: true,
  },

  createdDate: {
    type: String,
    required: true,
  },
});
User.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("user", User);
