const mongoose = require('mongoose');
const {Schema} =mongoose;

const userSchema = new Schema({
    email:{type:String, required:true,unique:true},
    password:{type:Buffer, required:true},
    role:{type:String, required:true,default:"user"},
    addresss:{type:[Schema.Types.Mixed]},
    orders:{type:[Schema.Types.Mixed]},
    fullName:{type:String,required:true,default:"Anonymous"},
    thumbnail :{type:String},
    salt:Buffer
});

const virtual = userSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,rest){
        delete rest._id
    }
})
exports.User=mongoose.model('User',userSchema);