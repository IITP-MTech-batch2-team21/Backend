const mongoose = require('mongoose');
const {Schema} =mongoose;

const productSchema = new Schema({
    title:{type:String, required:true,unique:true},
    description:{type:String, required:true},
    price:{type:Number, required:true,min :[0,'wrong price entered'], max :[10000,'max price entered']},
    discountPercentage:{type:Number, required:true,min :[1,'wrong discount entered'], max :[100,'max discount entered']},
    stock:{type:Number, required:true ,min :[0,'out of stock'],default:0},
    brand:{type:String, required:true},
    category :{type:String, required:true},
    thumbnail :{type:String, required:true},
    images :{type:[String], required:true},
    deleted:{type:Boolean,default:false},

    rating:{type:Number, required:true,min :[0,'wrong rating entered'], max :[5,'max rating entered']},

});

const virtual = productSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,rest){
        delete rest._id
    }
})
exports.Product=mongoose.model('Product',productSchema);