let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

let UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
