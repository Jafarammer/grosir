const Router = require("express").Router();
const controller = require("../../controller/auth/authController");

Router.post("/register", controller.register);
Router.post("/login", controller.login);

module.exports = Router;
