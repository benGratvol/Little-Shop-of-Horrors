const mongoose = require("mongoose");
const AccountTokenScheman = mongoose.Schema;
const Token = new AccountTokenScheman({
  user_id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  token_sent: {
    type: Boolean,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("token", Token);
