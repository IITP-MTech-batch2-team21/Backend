const express = require('express');
const {createOrder,fetchOrderByUserId,updateOrder, fetchAllOrders} = require("../controller/Order");
const router =express.Router();

router.get("/user/:user", fetchOrderByUserId)
        .get("/",fetchAllOrders)
        .post("/" ,createOrder)
        .patch("/:id",updateOrder);

exports.router=router;