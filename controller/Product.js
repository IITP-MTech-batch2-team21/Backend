const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    let condition ={};
    if(!req.query.admin){
      condition.deleted={$ne: true}
    }
    let query = Product.find(condition);
    let totalProductCountQuery = Product.find(condition);
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductCountQuery = totalProductCountQuery.find({
        category: req.query.category,
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductCountQuery = totalProductCountQuery.find({
        brand: req.query.brand,
      });
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    const totalProductCount = await totalProductCountQuery.count().exec();
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    const response = await query.exec();
    res.set("X-Total-Count", totalProductCount);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };
