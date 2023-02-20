let express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let userRouter = express.Router();
let { UserModel } = require("../models/user.model");

userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      // Store hash in your password DB.

      if (err) {
        res.send(err.message);
      } else {
        let user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          let token = jwt.sign({ userId: user[0]._id }, "masai");
          res.send({ msg: "Loggedin Successfull", token: token });
        } else {
          res.send("Something went wrong");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = { userRouter };
