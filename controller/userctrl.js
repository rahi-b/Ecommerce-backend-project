const User = require("../models/usermodel");
const asyncHandler = require("async-handler");

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      //create new user
      newUser = await User.create(req.body); 
      res.json(newUser);
    } else {
      //user already have message
      res.json({ message: "user already exists" });
    }
  } catch (err) {
    //server error
    console.error(err);
    res.status(500).json({ message: "interval server error" });
  }
};

let login = async (req, res) => {
  try {
    //finding registed user
    const { email, password } = req.body;
    finduser = await User.findOne({ email: email, password: password });
    if (finduser) {
      //session creation
      req.session.email = finduser.email;
      res.json("login successfully");
    } else {
      res.json("invalid username and email");
    }
  } catch (err) {
    //server error passing
    console.error(err);
    res.status(500).json({ message: "interval server error" });
  }
};

module.exports = { createUser, login };
