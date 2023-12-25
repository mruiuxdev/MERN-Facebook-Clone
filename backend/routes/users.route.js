const express = require("express");
const { registerUserController } = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.post("/register", registerUserController);

module.exports = usersRouter;
