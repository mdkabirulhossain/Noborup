import express from 'express'
import { allOrders, placeOrder, placeOrderStripe, updateOrdersStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js';


const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrdersStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);


//User Feature
orderRouter.post('/userorders', authUser, userOrders);


export default orderRouter;