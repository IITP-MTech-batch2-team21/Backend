const express = require('express');
const { createUser, loginUser, checkAuthUser } = require('../controller/Auth');
const passport = require('passport');

const router =express.Router();



router.post("/signup",createUser).post("/login",passport.authenticate('local'),loginUser).get("/checkAuth",passport.authenticate('jwt'),checkAuthUser);

exports.router=router;