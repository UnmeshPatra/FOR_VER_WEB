import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js"

//fuction for add product 
const addProduct = async (req,res) =>{
    try {
        const { name ,descreption ,size, price, category,subCategory, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const image = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        // now this images we have to store in the datbase so we will put this images in cloudnary then they eill give the url and we will store the url in the database
        let imageUrl = await Promise.all(
            image.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        // console.log( name ,descreption ,size, price, category,subCategory, bestseller);
        // console.log(imageUrl);

        //save this in mongo
        const productData = {
            name,
            descreption,
            category,
            subCategory,
            price:Number(price),
            bestseller:bestseller=== "true" ? true : false,
            size: JSON.parse(size),
            image: imageUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData);
        await product.save()



        res.json({success:true,message:"product added"})

    } catch (error) {

        console.log(error);     
        res.json({success:false,message:error.message})
        
    }
}
//fuction for list product 
const listProduct = async (req,res) =>{

    try {

        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {

        console.log(error);     
        res.json({success:false,message:error.message})
        
    }
    
}
//fuction for remove product 
const removeProduct = async (req,res) =>{
    try {
        
        // const {id} = req.body;
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"product removed"})
        
    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message})
        
    }

}
//fuction for single product info  
const singleProduct = async (req,res) =>{
    try {

        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message})
        
    }

}

export {listProduct,addProduct,removeProduct,singleProduct}