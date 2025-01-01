import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


// function for add product
const addProduct = async (req, res) => {

    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !==undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path , {resource_type:'image'})
                return result.secure_url
            })
        )
        
        const productData ={
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product added successfully"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
// function for list product
const listProducts = async (req, res) => {

    try{

        const products = await productModel.find({});

        res.json({success: true, products});

    }catch(error){

        console.log(error);
        res.json({success: false, message: error.message})
    }

}
// function for removing product
const removeProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Get the product ID from the URL parameter
  
      // Attempt to find and delete the product
      const product = await productModel.findByIdAndDelete(productId);
  
      // If no product is found with the provided ID
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// function for single product info
const singleProduct = async (req, res) => {

    try{

        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product});

    }catch(error){

        console.log(error);
        res.json({success: false, message: error.message})

    }

}
const addReview = async (req, res) => {
    try {
        const { productId, rating, reviewText, user } = req.body;

        if (!productId || !rating || !reviewText || !user) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find the product by ID
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Create a new review object
        const newReview = {
            user,
            rating,
            reviewText
        };

        // Push the new review to the reviews array
        product.reviews.push(newReview);

        // Save the updated product
        await product.save();

        res.json({ success: true, message: "Review added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all reviews for a product
const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, reviews: product.reviews });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {addProduct, listProducts, removeProduct, singleProduct, addReview, getReviews};