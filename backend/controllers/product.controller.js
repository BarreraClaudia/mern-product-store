import Product from '../models/product.model.js'; // make sure .js is at the end so it doesn't crash
import mongoose from 'mongoose'; // needed for update & delete method

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('error in fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  // make sure all required data is given
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product); // this comes from > import Product from './models/product.model.js'

  try {
    await newProduct.save(); // this saves it to the database
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error in create product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // name it the same as what follows the colon : in url (id)

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // name it the same as what follows the colon : in url (id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log('error in deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
