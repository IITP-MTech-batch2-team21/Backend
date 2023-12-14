const {Order} =require("../model/Order")
exports.fetchOrderByUserId = async (req, res) => {
    const {user} =req.params;
    console.log(user)
    try {
      const response = await Order.find({user:user}).populate('user');
    //   const response = await product.save();
      res.status(201).json(response);
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  };

  exports.createOrder = async (req, res) => {
    try {
      const order = new Order(req.body);
      const result = await order.save();
      console.log(result);
      const response = await result.populate('user');
      console.log(response);
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.updateOrder = async (req, res) => {
    try {
      const {id} = req.params;
      const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
      const response = await order.populate('user');
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json(err);
    }
  };

  exports.fetchAllOrders = async (req, res) => {
    try {
      let query = Order.find({deleted:{$ne: true}});
      let totalOrderCountQuery = Order.find({deleted:{$ne: true}});
      if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalOrderCountQuery = totalOrderCountQuery.find({
          category: req.query.category,
        });
      }
      if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
      }
      const totalOrderCount = await totalOrderCountQuery.count().exec();
      if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }
  
      const response = await query.exec();
      res.set("X-Total-Count", totalOrderCount);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  };