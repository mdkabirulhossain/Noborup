import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({});
   

    const addToCart = async (Itemid, size) => {
        //using structuredclone to copy data
        let cartData = structuredClone(cartItem);
        if(!size){
            toast.error("Select product size");
            return;
        }
        if (cartData[Itemid]) {
            if (cartData[Itemid][size]) {
                cartData[Itemid][size] += 1;
            } else {
                cartData[Itemid][size] = 1;
            }
        } else {
            cartData[Itemid] = {};
            cartData[Itemid][size] = 1;
        }

        setCartItem(cartData);
    }


    //product remove from the cart only when quantity is 0
    const updateQuantity = async(Itemid, size, quantity) =>{
        let cartData = structuredClone(cartItem);

        cartData[Itemid][size] = quantity;
        setCartItem(cartData);
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0){
                        totalCount += cartItem[items][item];
                    }
                } catch(error){
                    console.log(error)
                }
                
            }
        }
        return totalCount;
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find(product =>product._id === items);
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0){
                        totalAmount += itemInfo.price * cartItem[items][item]
                    }
                } catch(error){
                    console.log("Get Cart Amount error")
                }
            }
        }
        return totalAmount;
        
    }




    useEffect(()=>{
        console.log(cartItem)
    }, [cartItem])

    const value = {
        products,
        currency,
        delivery_fee,
        search, 
        setSearch,
        showSearch,
        setShowSearch,
        addToCart, 
        cartItem,
        updateQuantity,
        getCartCount,
        getCartAmount,
    }

    return (
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider> 
    )
}

export default ShopContextProvider;