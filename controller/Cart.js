const {Cart} =require('../model/Cart');

exports.fetchCartByUserId = async (req, res) => {
    const {user} =req.query;
    console.log(user)
    try {
      const response = await Cart.find({user:user}).populate('product').populate('product');
    //   const response = await product.save();
      res.status(201).json(response);
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  };

  exports.addToCart = async (req, res) => {
    try {
      const cart = new Cart(req.body);
      const result = await cart.save();
      console.log(result);
      const response = await result.populate('product');
      console.log(response);
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  exports.deleteFromCart = async (req, res) => {
    try {
      const {id} = req.params;
      const cart = await Cart.findByIdAndDelete(id);
    //   const response = await cart.populate('product');
    //   console.log(response);
    //   res.status(200).json(cart);
    //   console.log(response);
      res.status(200).json(cart);
    } catch (err) {
      res.status(404).json(err);
    }
  };

  exports.updateCart = async (req, res) => {
    try {
      const {id} = req.params;
      const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true});
      const response = await cart.populate('product');
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json(err);
    }
  };