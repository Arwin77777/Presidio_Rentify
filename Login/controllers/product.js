const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = new Product({ name, description, price, inStock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};