const express = require("express");
const {
  registerController,
  activeAccountController,
  loginController,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter
  .post("/register", registerController)
  .post("/activate", activeAccountController)
  .post("/login", loginController);

module.exports = usersRouter;
