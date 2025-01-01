import Wishlist from '../models/wishlistModel.js';

// Add an item to the wishlist
export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming user authentication is implemented

    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        const alreadyExists = wishlist.items.find((item) => item.productId.toString() === productId);
        if (alreadyExists) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist' });
        }

        wishlist.items.push({ productId });
        await wishlist.save();

        res.status(200).json({ success: true, message: 'Product added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove an item from the wishlist
export const removeFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId);
        await wishlist.save();

        res.status(200).json({ success: true, message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch wishlist
export const getWishlist = async (req, res) => {
    const userId = req.user.id;

    try {
        const wishlist = await Wishlist.findOne({ userId }).populate('items.productId');
        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
