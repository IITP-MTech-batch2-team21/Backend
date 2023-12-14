const express = require('express');
const dotenv = require('dotenv');
const server =express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const productRouter = require("./routes/Products");
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const categoriesRouter= require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const {isAuth, authPassportServices,cookieExtractor,JwtSecretKey} =require("./middlewares/Middleware");
// Process ENV variables
dotenv.config();
const PORT = process.env.PORT || 5004;
const MONGO_URL = process.env.MONGO_URL || "";

// Config Database Configuration
mongoConnection().catch(err => console.error(err));
async function mongoConnection(){
    await mongoose.connect(MONGO_URL);
    console.log('database connection established');
} 
// middleware
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use(express.json());
server.use(helmet());
server.use(express.urlencoded());
server.use(cookieParser());

// server.use(expressCspHeader({
//   directives: {
//       'default-src': [SELF],
//       'script-src': [SELF, INLINE],
//       'style-src': [SELF],
//       'img-src': ['data:'],
//       'worker-src': [NONE],
//       'block-all-mixed-content': true
//   }
// }));
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = JwtSecretKey();
server.use(session({
    secret: 'secret',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  }));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(path.resolve(__dirname,'client')));

server.use(helmet.crossOriginResourcePolicy({policy:"cross-origin",directives:{
  defaultSrc:["'self','https://i.dummyjson.com','https://images.unsplash.com'"],
  connectSrc:["'self','https://i.dummyjson.com',https://images.unsplash.com'"],
}}));
server.use(morgan("common"));



// routes
server.use("/api/auth", authRouter.router);
server.use("/api/user", userRouter.router);
server.use("/api/products",isAuth(), productRouter.router);
server.use("/api/brand",isAuth(), brandsRouter.router);
server.use("/api/category",isAuth(), categoriesRouter.router);
server.use("/api/cart", isAuth(),cartRouter.router);
server.use("/api/order",isAuth(), orderRouter.router);


server.use("/app/*",(req,res)=>{
  try{
    res.sendFile(path.join(__dirname,"/client/index.html"));
  }
  catch(e){
    console.log(e);
    res.status(404);
  }

  
})
server.use('*',(req,res,next)=>{
  console.log("Another");
  res.redirect("/app/");
})
// console.log(LocalStrategy(req, res, next));
authPassportServices(opts);
server.listen(PORT,() => {
    console.log(`Server listening on ${PORT}`);
})