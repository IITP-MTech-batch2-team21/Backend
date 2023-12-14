const express = require('express');
const { createProduct, fetchAllProducts,fetchAllProductById,updateProduct } = require('../controller/Product');

const router =express.Router();

router.post("/", createProduct)
    .get("/",fetchAllProducts)
    .get("/:id",fetchAllProductById)
    .patch("/:id",updateProduct);

exports.router=router;