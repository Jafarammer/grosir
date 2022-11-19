const Router = require("express").Router();
const controller = require("../../controller/product/productController");
const prodcutUpload = require("../../middleware/multer/productUpload");
const validateToken = require("../../middleware/verifyToken");

Router.get("/product", controller.getAllProduct);
Router.post(
  "/product/add",
  validateToken.checkToken,
  prodcutUpload,
  controller.createProduct
);
Router.patch(
  "/product/edit/:id",
  validateToken.checkToken,
  prodcutUpload,
  controller.updateProduct
);
Router.delete(
  "/product/delete/:id",
  validateToken.checkToken,
  controller.deleteProduct
);

module.exports = Router;
