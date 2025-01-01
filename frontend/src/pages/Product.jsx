import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fetch product data based on productId from the context or API if not available
  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    setReviews(savedReviews);
  }, [productId]);

  // Handle rating change
  const handleRatingClick = (newRating) => {
    setRating(newRating); // Update the rating state when a star is clicked
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    if (review.trim() === '') {
      alert('Please write a review.');
      return;
    }

    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }

    const reviewData = {
      rating,
      reviewText: review,
      user: 'Anonymous', // Replace with actual user if available
    };

    // Add the new review to the reviews list
    const updatedReviews = [...reviews, reviewData];
    setReviews(updatedReviews);

    // Save reviews to localStorage
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));

    // Clear the review input and reset rating
    setReview('');
    setRating(0);

    alert('Review submitted successfully!');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-capacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < calculateAverageRating() ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-3.5 cursor-pointer"
                onClick={() => handleRatingClick(index + 1)}
              />
            ))}
            <p className='pl-2'>{reviews.length} Reviews</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border bg-gray-100 px-4 py-2 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/*--------Description & Review Section--------*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews({reviews.length})</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...</p>
        </div>

        {/* Review Form */}
        <div className='mt-10'>
          <h2 className='text-xl font-medium mb-4'>Submit a Review</h2>
          <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? assets.star_icon : assets.star_dull_icon}
                alt="star"
                className="w-6 cursor-pointer"
                onClick={() => handleRatingClick(index + 1)}
              />
            ))}
          </div>
          <textarea
            className="mt-4 w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit} // Ensure this prevents page reload
            className="mt-4 bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Submit Review
          </button>
        </div>

      </div>

      {/*-------Display Related Products--------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
