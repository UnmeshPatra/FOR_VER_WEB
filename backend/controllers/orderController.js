import Razorpay from 'razorpay'
import orderModel from '../models/orderModel.js'

// Initialize Razorpay instance
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// placing order using cod method 
const placeOrder = async (req,res) =>{
    
}

const placeOrderStripe = async (req,res) =>{

}

const placeOrderRazorPay = async (req,res) =>{
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // amount should be in paise
            currency: 'INR', // Fixed: define currency directly
            receipt: newOrder._id.toString()
        };

        // Fixed: use orders.create and proper async/await
        const order = await razorPayInstance.orders.create(options);
        res.json({success: true, order});

    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

//all order for admin panel 
const allOrders = async (req,res)=>{
    
}

//user order data for frontend 
const userOrders = async (req,res)=>{

}

//update order status from admin panel 
const updateStatus = async (req,res)=>{

}

export {placeOrder,placeOrderRazorPay,placeOrderStripe,allOrders,userOrders,updateStatus}