const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/product/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}_${Math.random()}_${uuidv4()}_${path.extname(
        file.originalname
      )}`
    );
  },
});

const uploadDetail = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PNG,JPG format allowed"), false);
    }
  },
  limits: { fileSize: 100000 }, //100kb
});

const uploadProductMulter = (req, res, next) => {
  try {
    const uploadSingle = uploadDetail.single("product_img");
    uploadSingle(req, res, (error) => {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res
            .status(404)
            .send({ messageFile: "File to large, maximum 100kb" });
        }
        return res.send({ messageType: error.message });
      } else {
        return next();
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = uploadProductMulter;
