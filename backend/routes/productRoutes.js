import express from 'express';
import {listProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js'

const userRouter = express.Router();

userRouter.post('/add',addProduct)
userRouter.post('/remove',removeProduct)
userRouter.post('/list',listProduct)
userRouter.post('/single',singleProduct)

export default userRouter;