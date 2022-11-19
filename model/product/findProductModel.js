const db = require("../../config/db");

const findIdProductModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
module.exports = { findIdProductModel };
