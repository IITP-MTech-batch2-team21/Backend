const { processUser } = require("../middlewares/Middleware");
const { User } = require("../model/User");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const {JwtSecretKey} = require("../middlewares/Middleware")
exports.createUser = async (req, res) => {
  try {
    let salt = await crypto.randomBytes(16);
    const existingUser= await User.findOne({email:req.body.email});
    if(existingUser){
      res.status(400).json({message:"Already Email id exists"});
    }
    else{
      
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const userData =await {
            ...req.body,
            password: hashedPassword,
           salt:salt,
          };
          const result = new User(userData);
          const user = await result.save();
          req.login(user,(err)=> {
            if (err) { return res.status(401).json({message :"User unauthenticated"}) }
            let token =jwt.sign(processUser(user),JwtSecretKey())
            res.cookie('access_token', token, {
              expires: new Date(Date.now() +  4*3600000) // cookie will be removed after 8 hours
            }).status(201).setHeader('token' ,`Bearer ${token}`).json(processUser(user));
            ;
          });
        }
      );
    }
    
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.loginUser = async(req, res) => {
  res.cookie('access_token', req.user.token, {
    expires: new Date(Date.now() + 4*3600000) // cookie will be removed after 8 hours
  }).status(200).json({...req.user.user,token: req.user.token});
};

exports.checkAuthUser = async(req, res) => {
  if(req.user){
  res.status(200).json(req.user);
  }
  else 
  res.status(400).json({message: "UnAuthorized User"});

};