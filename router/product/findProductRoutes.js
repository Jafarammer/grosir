const Router = require("express").Router();
const findController = require("../../controller/product/findProductController");

Router.get("/product/id/:id", findController.getIdProduct);

module.exports = Router;
