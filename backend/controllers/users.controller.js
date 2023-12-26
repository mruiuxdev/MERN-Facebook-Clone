const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  generateRandomString,
  generateUniqueUsername,
} = require("../helpers/validate");
const User = require("../models/users.model");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");

const registerUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
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

    let newUserName = await generateUniqueUsername(firstName, lastName);

    const user = await new User({
      firstName,
      lastName,
      userName: newUserName,
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

    const emailVerificationUrl = `${process.env.FRONT_URL}/activate/${emailVerificationToken}`;

    sendVerificationEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      emailVerificationUrl
    );

    const accessToken = generateToken({ id: user._id.toString() }, "7d");

    res.json({
      result: "Success",
      message: "Registered success! please, activate your email",
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        isVerified: user.isVerified,
        picture: user.picture,
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ result: "Failed", message: error.message });
  }
};

module.exports = { registerUserController };
