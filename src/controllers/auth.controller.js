require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const newToken = (user) => {
  return jwt.sign({ user: user, exp: 60 * 5 }, process.env.JWT_SECRET_KEY);
};
const signup = async (req, res) => {
  try {
    //check if email provides alredy to other user
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    //if yes then show error
    if (user)
      return res
        .status(500)
        .send({ message: "User with the email already exists" });
    //if not then we shd create user and hash
    user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(500)
        .send({ message: "User of  the email and password Wrong" });

    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(500)
        .send({ message: "User with the email1 already exists" });
    }

    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }

  return res.send("login");
};

module.exports = { signup, signin };
