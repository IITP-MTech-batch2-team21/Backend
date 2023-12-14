const mongoose = require('mongoose');
const {Schema} =mongoose;

const orderSchema = new Schema({
    totalAmount:{type:Number, required:true},
    totalItems:{type:Number, required:true},
    items:{type:[Schema.Types.Mixed],required:true},
    user:{type:Schema.Types.ObjectId, ref:"User", required:true},
    paymentMethod:{type:String,required:true},
    status:{type:String, required:true},
    selectedAddress:{type:Schema.Types.Mixed, required:true}
  
});

const virtual = orderSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,rest){
        delete rest._id
    }
})
exports.Order=mongoose.model('Order',orderSchema);