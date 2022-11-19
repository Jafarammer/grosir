const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// set cors
const corsOptions = {
  origins: [
    // "https://grosirfe.web.app/",
    // "https://sweet-cake-responsive.vercel.app",
    "http://localhost:3000",
  ],
};
app.use(cors(corsOptions));

// Router
const productRouter = require("./router/product/productRoutes");
const findProdcutRouter = require("./router/product/findProductRoutes");
const autRouter = require("./router/auth/authRoutes");
// end Router

// routes prodcut
app.use("/", productRouter);
app.use("/find", findProdcutRouter);
// routes auth
app.use("/auth", autRouter);

app.use("*", (req, res) => {
  res.send("I'm Jafar Success");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
