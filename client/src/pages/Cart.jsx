import React, { useContext, useEffect, useState } from 'react';

import { MdDelete } from "react-icons/md";
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { Link } from 'react-router';
// import { products } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItem, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    })
                }
            }
        }
        // console.log(tempData);
        setCartData(tempData);
    }, [cartItem])
    
    return (
        <div className='border-t pt-12'>

            <div className='text-2xl mb-3'>
                <Title text1={"CART"} text2={"ITEMS"}></Title>

            </div>
            <div>
                {
                    cartData.map(item => {
                        const productData = products.find(product => product._id === item._id);

                        return (
                            <div key={item._id} >

                                <div className='flex justify-between items-center gap-5 '>
                                    <div className='flex gap-5'>
                                        <img className='w-16 sm:20' src={productData?.image[0]} alt="" />
                                        <div className='md:min-w-xl'>
                                            <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                            <div className='flex items-center gap-5 mt-2'>
                                                <p className=''>{currency}{productData.price}</p>
                                                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>

                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} name="" id="" />
                                    </div>

                                    <div>
                                        <MdDelete onClick={() => updateQuantity(item._id, item.size, 0)} className='cursor-pointer w-10 h-7'></MdDelete>
                                    </div>


                                </div>

                                <hr className='my-2' />
                            </div>

                        )
                    })
                }
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className="w-full text-end">
                        <Link to={'/PlaceOrder'}> <button className='bg-black text-white text-sm my-8 px-8 py-3'>PROCED TO CHECKOUT</button></Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;