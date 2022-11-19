const model = require("../../model/product/productModel");
const findModel = require("../../model/product/findProductModel");
const cloudinary = require("../../middleware/cloudinary");

const getAllProduct = async (req, res) => {
  try {
    const getData = await model.getAllProductModel();
    return res.status(200).send(getData.rows);
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_purchase_price,
      product_selling_price,
      product_stock,
    } = req.body;
    // const { product_purchase_price, product_selling_price, product_stock } =
    //   parseInt(req.body);
    const uploadImage = req?.file
      ? await cloudinary.uploader.upload(req?.file?.path, { folder: "recipe" })
      : null;
    const product_img = req?.file ? uploadImage.secure_url : null;
    const getData = await model.addProductModel({
      product_name,
      product_purchase_price,
      product_selling_price,
      product_stock,
      product_img,
    });
    if (getData) {
      return res.status(200).send({ message: "Data added successfully" });
    } else {
      return res.status(400).send({ error: "Data failed to add!!!" });
    }
  } catch (error) {
    console.log(`Error in here ${error}`);
    return res.status(500).send("Internal server error!!!");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_name,
      product_purchase_price,
      product_selling_price,
      product_stock,
    } = req.body;
    const updateImage = req?.file?.path
      ? await cloudinary.uploader.upload(req?.file?.path, { folder: "recipe" })
      : undefined;
    const product_img = updateImage?.secure_url;
    const checkData = await findModel.findIdProductModel(id);
    if (checkData.rowCount > 0) {
      let inputProductName = product_name || checkData.rows[0]?.product_name;
      let inputPurchasePrice =
        product_purchase_price || checkData.rows[0]?.product_purchase_price;
      let inputSellingPrice =
        product_selling_price || checkData.rows[0]?.product_selling_price;
      let inputStock = product_stock || checkData.rows[0]?.product_stock;
      let inputProductImg = product_img || checkData.rows[0]?.product_img;

      const updateData = await model.editProductModel({
        product_name: inputProductName,
        product_purchase_price: inputPurchasePrice,
        product_selling_price: inputSellingPrice,
        product_stock: inputStock,
        product_img: inputProductImg,
        product_id: id,
      });

      if (updateData) {
        return res.status(200).send({ message: "Data changed successfully" });
      } else {
        return res.status(400).send({ message: "Data failed to changed!" });
      }
    } else {
      return res.status(404).send({ message: "Data not found!" });
    }
  } catch (error) {
    console.log(`Error in her ${error}`);
    return res.status(500).send("Internal server error!!!");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getDataId = await findModel.findIdProductModel(id);
    if (getDataId.rowCount > 0) {
      const getData = await model.deleteProductModel(id);
      if (getData) {
        return res
          .status(200)
          .send({ message: `Product with id ${id} deleted successfully` });
      }
    } else {
      return res.status(404).send({ message: "Data not found!" });
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

module.exports = { getAllProduct, createProduct, updateProduct, deleteProduct };
