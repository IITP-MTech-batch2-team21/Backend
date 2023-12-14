const express = require('express');
// const  {fetchBrands ,createBrand} = require("../controller/Brands");
const { addToCart, fetchCartByUserId,deleteFromCart, updateCart } = require('../controller/Cart');

const router =express.Router();

router.get("/", fetchCartByUserId).post("/" , addToCart).delete("/:id",deleteFromCart).patch("/:id",updateCart);

exports.router=router;