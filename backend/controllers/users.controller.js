const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validate");
const User = require("../models/users.model");
const { generateToken } = require("../helpers/token");

const registerUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ result: "Failed", message: "Invalid email address" });
    }

    const emailIsExisted = await User.findOne({ email });
    if (emailIsExisted) {
      return res.status(400).json({
        result: "Failed",
        message: "Email is already exists",
      });
    }

    if (!validateLength(firstName, 3, 30)) {
      return res.status(400).json({
        result: "Failed",
        message: "First name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(lastName, 3, 30)) {
      return res.status(400).json({
        result: "Failed",
        message: "Last name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        result: "Failed",
        message: "Password must be between 4 and 60 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let tempUsername = firstName + lastName;
    let newUsername = await validateUsername(
      userName ? userName : tempUsername
    );

    const user = await new User({
      firstName,
      lastName,
      userName: newUsername,
      email,
      password: hashedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    console.log(emailVerificationToken);

    res.json({
      result: "Success",
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({ result: "Failed", message: error.message });
  }
};

module.exports = { registerUserController };
