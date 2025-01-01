import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true }, 
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    reviews: [
        {
            user: { type: String, required: true },  // Name or identifier of the user
            rating: { type: Number, required: true },  // Rating (1 to 5)
            reviewText: { type: String, required: true },  // Review text
            date: { type: Date, default: Date.now }  // Review date
        }
    ]
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
