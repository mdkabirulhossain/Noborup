import React, { useState } from 'react';
import { FaCcStripe } from 'react-icons/fa';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMothod] = useState('cod');
    const {backendUrl, token, navigate, cartItem, setCartItem,getCartAmount,products,delivery_fee} = useContext(ShopContext);

    const [formdata, setFormData] = useState({
        firstName: '',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:''
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setFormData(data =>({...data, [name]:value}))

    }

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        try{

            let orderItems = [];
            for(const items in cartItem){
                for(const item in cartItem[items]){
                    if(cartItem[items][item] > 0){
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if(itemInfo){
                            itemInfo.size = item;
                            itemInfo.quantity = cartItem[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }
            // check order data
            // console.log(orderItems);

            let orderData = {
                address: formdata,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch(method){
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
                    if(response.data.success){
                        setCartItem({});
                        navigate('/orders')
                    }else{
                        toast.error(response.data.message)
                    }
                    break;

                default:
                    break;
                
            }

        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* left side  */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={'INFORMATION'}></Title>
                </div>

                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='firstName' value={formdata.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formdata.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formdata.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Enter Email' />
                <input required onChange={onChangeHandler} name='street' value={formdata.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Enter streat address' />

                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='city' value={formdata.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formdata.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name='zipcode' value={formdata.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcoe' />
                    <input required onChange={onChangeHandler} name='country' value={formdata.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formdata.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* Right side  */}
            <div className="mt-8">
                <div className="mt-8  min-w-80">
                    <CartTotal></CartTotal>
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
                    {/* payment method section  */}

                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMothod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-orange-500' : " "}`}></p>
                            {/* <FaCcStripe className='h-8 w-16 mx-4'></FaCcStripe> */}
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMothod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? "bg-orange-500" : ""}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='cursor-pointer bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> 
                    </div>

                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;