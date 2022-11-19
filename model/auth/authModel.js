const db = require("../../config/db");

const userEmailModel = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
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

const authModel = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users(first_name,last_name,email,password) VALUES ($1,$2,$3,$4)",
      [props.first_name, props.last_name, props.email, props.password],
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

module.exports = { userEmailModel, authModel };
