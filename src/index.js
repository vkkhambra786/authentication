const express = require("express");
const { signup, signin } = require("./controllers/auth.controller");
const productcontroller = require("./controllers/product.controller.js");
const app = express();
app.use(express.json());

app.post("/signup", signup);
app.post("/login", signin);

app.use("/products", productcontroller);
module.exports = app;
