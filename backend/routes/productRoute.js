import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct, addReview, getReviews } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();


productRouter.post('/add', upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);
productRouter.get('/list',  listProducts);
productRouter.post('/remove/:id', removeProduct);
productRouter.post('/single', singleProduct);


productRouter.post('/api/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { rating, reviewText, user } = req.body;
  
    try {
      // Find the product by its ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Create a new review object
      const newReview = {
        rating,
        reviewText,
        user,
        date: new Date(),
      };
  
      // Add the new review to the product's reviews array
      product.reviews.push(newReview);
  
      // Save the product with the new review
      await product.save();
  
      // Send the updated product data back as the response
      res.status(200).json({ message: 'Review submitted successfully', reviews: product.reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while submitting review' });
    }
  });

export default productRouter;