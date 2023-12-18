const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isEmail } = require("validator");
const {JWT_LOGIN_TOKEN} = require('../config/keys')

const login = async (req, res) => {
  const { email, password } = req.body;

  const dbUser = await User.findOne({ email: email }).exec();
  console.log(dbUser, "------>dbuser");

  if (dbUser) {
    const match = await bcrypt.compare(password, dbUser.password);
    if (match) {
      const token = jwt.sign(
        { _id: dbUser._id, name: dbUser.name, email },
        JWT_LOGIN_TOKEN,
        { expiresIn: "1d" }
      );

      // Set the JWT token as a cookie
      res.cookie("token", token, { httpOnly: true });

      // Set the JWT token as an HttpOnly cookie
      //   const cookies = new Cookies(req, res);
      //   cookies.set('token', token, {
      //     httpOnly: true,
      //     // Set other cookie options as needed (secure, sameSite, etc.)
      //   });
      res.json({
        message: "Login Succesfull",
        token,
      });
    } else {
      res.status(400).json({ message: "Username  os Password incorrect" });
      console.log("27 page");
    }
  } else {
    res.status(400).json({ message: "No user Found with this Email" });
    console.log("32 page");
  }
};

const saltRounds = 10;

const validateSignupData = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  if (name.trim().length === 0) {
    res.status(400).json({ message: "Please Enter a Name" });
    return false;
  }

  if (!isEmail(email)) {
    res.status(400).json({ message: "Please Enter a valid email" });
    return false;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please Enter password" });
    return false;
  } else if (password.trim().length <= 5) {
    res
      .status(400)
      .json({ message: "Minimum password length is 6 characters" });
    return false;
  }

  // check if email exists in DB!
  const existingUser = await User.findOne({ email: email }).exec();
  if (existingUser) {
    console.log("Email Already Registered");
    res.status(400).json({ message: "Email Already Registered" });
    return false;
  }

  return true;
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Validate Inputs
  const isValid = await validateSignupData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ name, email, password: hashedPassword });

      return res.json({
        message: "Account Created Successfully",
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  }
};

const getUsersList = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users, "-------------------->");

    if (users.length > 0) {
      const usersData = users.map((user) => {
        return {
          ...user._doc,
        };
      });
      res.json({
        message: `Total ${users.length} Users Found`,
        users: usersData,
      });
    } else {
      res.json({
        message: "No Users Found",
      });
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  console.log("working", req.params.id);
  try {
    const userData = await User.find({ _id: req.params.id });
    console.log(userData, "-------------------->");
    if (userData.length >= 1) {
      res.json({
        message: "User Found",
        users: userData,
      });
    } else {
      res.json({
        message: "No User Found",
      });
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  getUsersList,
  login,
  signup,
  getUser
};
