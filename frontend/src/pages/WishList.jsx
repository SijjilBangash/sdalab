import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';  // assuming you have some assets for icons

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(ShopContext);

  return (
    <div className="wishlist-page max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>
      <div className="wishlist-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-xl">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map(item => (
            <div key={item._id} className="wishlist-item bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ease-in-out duration-300">
              <div className="wishlist-image relative">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <img src={assets.remove_icon} alt="Remove" className="w-4 h-4" />
                </button>
              </div>
              <div className="wishlist-info p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h2>
                <p className="text-lg font-medium text-gray-600 mt-2">{item.price}</p>
                <div className="mt-4 flex gap-4">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-sm text-blue-500 hover:underline transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
