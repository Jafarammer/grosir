const model = require("../../model/auth/authModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const searchEmail = await model.userEmailModel(email);
    const getEmail = searchEmail.rows;

    // encrypt password
    const saltPass = bcrypt.genSaltSync(15);
    const hashPass = bcrypt.hashSync(password, saltPass);

    if (getEmail.length != 0) {
      return res.status(400).send({ message: "Email already exist!!!" });
    } else {
      const getData = await model.authModel({
        first_name,
        last_name,
        email,
        password: hashPass,
      });
      if (getData) {
        return res.status(200).send({ message: "Register successfully" });
      }
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const searchEmail = await model.userEmailModel(email);
    if (searchEmail?.rowCount) {
      const checkPassword = bcrypt.compareSync(
        password,
        searchEmail?.rows[0]?.password
      );
      if (checkPassword) {
        const token = jwt.sign(
          searchEmail?.rows[0],
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).send({
          user: { ...searchEmail?.rows[0], ...{ password: null } },
          token,
          message: "Login success",
        });
      } else {
        return res.status(400).send({ error: "Password wrong" });
      }
    } else {
      return res.status(400).send({
        error: "User not found, please enter a valid email!!!",
      });
    }
  } catch (error) {
    return res.status(500).send("Internal server error!!!");
  }
};

module.exports = { register, login };
