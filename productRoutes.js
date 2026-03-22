const express = require("express");
const router = express.Router();

const { addProduct, getProducts } = require("../controllers/productControllers");

router.post("/add", addProduct);
router.get("/", getProducts);

module.exports = router;