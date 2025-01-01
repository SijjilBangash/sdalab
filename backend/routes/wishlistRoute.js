// wishlistRoutes.js
import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.get('/', getWishlist);

export default router;
