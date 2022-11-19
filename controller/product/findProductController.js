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

module.exports = { getIdProduct };
