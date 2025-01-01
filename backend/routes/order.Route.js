import express from 'express';
import { verifyStripe, placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyRazorpay  } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', allOrders);
orderRouter.post('/status', updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// Verify Stripe Payment

orderRouter.post('/verifyStripe', authUser, verifyStripe);

// User features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;