<<<<<<< HEAD
import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    descreption:{type:String, required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    size:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
})

const productModel = mongoose.model.product || mongoose.model('product',productSchema)

=======
import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    descreption:{type:String, required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    size:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
})

const productModel = mongoose.model.product || mongoose.model('product',productSchema)

>>>>>>> origin/main
export default productModel