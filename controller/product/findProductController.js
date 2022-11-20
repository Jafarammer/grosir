const findModel = require("../../model/product/findProductModel");

const getIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await findModel.findIdProductModel(id);
    if (getData.rowCount == 0) {
      return res.status(404).send({ message: "Data not found!" });
    } else {
      return res.status(200).send(getData.rows);
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

const getNameProduct = async (req, res) => {
  try {
    const { product_name } = req.query;
    const productName = `%${product_name.toLowerCase()}%`;
    const getData = await findModel.findNameProductModel(productName);
    if (getData.rowCount > 0) {
      return res.status(200).send({
        data: getData.rows,
        totalData: getData.rowCount,
      });
    } else {
      return res.status(404).send(`Product ${product_name} not found!`);
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

module.exports = { getIdProduct, getNameProduct };
