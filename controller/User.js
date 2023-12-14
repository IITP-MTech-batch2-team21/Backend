const { processUser } = require("../middlewares/Middleware");
const { User } = require("../model/User");

exports.fetchUser = async(req,res)=>{
    try{
        const users= await User.find({}).exec();
        res.status(200).json(users)
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.fetchUserByID = async(req,res)=>{
    const {id} =req.params;
    try{
        const user= await User.findById(id).exec();
        res.status(200).json(processUser(user))
    }
    catch(err){
        res.status(401).json(err);
    }
}

exports.updateUser = async(req,res)=>{
    const {id} =req.params;
    console.log(id);
    try{
        const users= await User.findByIdAndUpdate(id,req.body,{new:true}).exec();
        res.status(200).json(processUser(users))
    }
    catch(err){
        res.status(400).json(err);
    }
}
