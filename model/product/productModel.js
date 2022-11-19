const db = require("../../config/db");

const getAllProductModel = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM products ORDER BY product_id ASC",
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

const addProductModel = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO products(product_name,product_purchase_price,product_selling_price,product_stock,product_img) VALUES ($1,$2,$3,$4,$5)",
      [
        props.product_name,
        props.product_purchase_price,
        props.product_selling_price,
        props.product_stock,
        props.product_img,
      ],
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

const editProductModel = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET product_name = $1,product_purchase_price = $2,product_selling_price =$3,product_stock = $4,product_img = $5 WHERE product_id = $6 ",
      [
        props.product_name,
        props.product_purchase_price,
        props.product_selling_price,
        props.product_stock,
        props.product_img,
        props.product_id,
      ],
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

const deleteProductModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM products WHERE product_id = $1",
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

module.exports = {
  getAllProductModel,
  addProductModel,
  editProductModel,
  deleteProductModel,
};
