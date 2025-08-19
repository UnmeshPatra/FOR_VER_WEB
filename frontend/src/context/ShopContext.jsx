import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = '$';
    const delevery_fee = 10 ;
    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')
    const navigate = useNavigate();

    const addtoCart = async (itemId,size)=>{


        if(!size){
            toast.error('Select Product size');
            return;
        }



        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1 ;
        }
        setCartItems(cartData);


        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.messsage)
                
            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                try {
                    if (cartItems[item][size] > 0) {
                        totalCount += cartItems[item][size];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    };
    
    const updateQuantity = async (itemId,size,quantity) =>{

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.messsage)
                
            }
        }

    }


    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            if (!itemInfo) continue; // Prevents errors if the product is not found
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            } 
        }
        return totalAmount; // Missing return statement
    };
    
    const getProductData = async () =>{
        try {

            const response = await axios.get(backendUrl + '/api/product/list' )
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.messsage)
            }
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.messsage)            
        }
    }

    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)

            }
        } catch (error) {
            console.log(error);
            toast.error(error.messsage)            
        }
    }

    useEffect(()=>{
        getProductData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products,
        currency,
        delevery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addtoCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;