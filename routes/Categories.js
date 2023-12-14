const express = require('express');
const { fetchCategory,createCategory } = require("../controller/Categories.js");

const router =express.Router();

router.get("/", fetchCategory).post("/", createCategory);

exports.router=router;