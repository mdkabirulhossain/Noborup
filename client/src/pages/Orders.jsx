import React, { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';


const Orders = () => {
    const { products, currency } = useContext(ShopContext);

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'}></Title>
            </div>

            <div>
                {
                    products.slice(0, 3).map(item =>
                        <div key={item._id} className='border-t py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item.image} alt="" />
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.price}</p>
                                        <p className='text-lg'>Quantity: 1</p>
                                        <p className='text-lg'>Size: M</p>
                                    </div>
                                    <p className="mt-2">
                                        Date: <span className="text-gray-400">{new Date().toLocaleDateString()}</span>
                                    </p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-orange-500'></p>
                                        <p className='text-sm md:text-base'>Ready to ship</p>
                                </div>
                                <button className='border px-4 text-sm font-medium rounded-sm'>Track Order</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Orders;