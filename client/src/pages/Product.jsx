import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import { FaStar } from 'react-icons/fa6';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async() =>{
        products.map((item) =>{
            if(item._id === productId){
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        })
    }

    useEffect(()=>{
        fetchProductData();
    }, [productId]) 

    return productData? (
        <div className='border-t-2 pt-10 transition-opacity ease in duration-500 opacity-100'>
            {/* Product Data  */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* product Images  */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                            {
                                productData?.image?.map((item, index)=><img onClick={()=>setImage(item)}
                                src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                ></img>)
                            }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                            <img className='w-full h-auto' src={image} alt="" />
                    </div>
                    
                </div>
                    {/* Product info  */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <FaStar className='text-red-600'></FaStar>
                        <FaStar className='text-red-600'></FaStar>
                        <FaStar className='text-red-600'></FaStar>
                        <FaStar className='text-red-600'></FaStar>
                        <FaStar className='text-red-600'></FaStar>

                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md: w-4/5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi soluta? Libero quaerat excepturi nostrum iste eos hic, sit assumenda possimus voluptas iure quasi sint voluptates laudantium ut impedit enim!</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>

                        <div className='flex gap-2'>
                            {
                                productData.sizes.map((item, index) =>

                                    <button key={index} onClick={()=>setSize(item)}  className={`border py-2 px-4 bg-gray-100 ${size === item? 'border-orange-500': " "}`}>{item}</button>
                                )
                            }
                        </div>

                    </div>
                    <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                            <p>100% Original product.</p>
                            <p>Cash on delivery is available on this product</p>
                            <p>Easy return and exchange policy within 7 days</p>
                    </div>
                </div>
            </div>
            {/* Description & Review secction  */}
            <div className='mt-20'>
                <div className='flex'>
                    <p className='border px-5 py-3 text-sm'>Description</p>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>

                </div>

                <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat obcaecati quibusdam dicta odio ducimus assumenda reprehenderit perferendis porro, aspernatur asperiores laudantium neque esse, non eum dolorum commodi. Laboriosam, cupiditate obcaecati ipsum, vero neque aliquam atque quasi eligendi porro minima dolores perspiciatis fugiat velit perferendis accusamus quos debitis harum omnis sed.</p>
                    <p>Review ipsum dolor sit amet consectetur adipisicing elit. Incidunt ducimus cumque provident veritatis perspiciatis dolorum exercitationem laudantium! Suscipit, odio illo! Odit qui minima fugit tenetur aspernatur molestiae pariatur provident labore voluptatem perspiciatis fugiat culpa corrupti incidunt perferendis, soluta dolor aliquam, ipsam quisquam tempore corporis porro reprehenderit. Libero doloribus in recusandae!</p>
                </div>

            </div>

            {/* Related Product  */}
            <RelatedProducts categroy={productData.categroy} subCategory={productData.subCategory} />
        </div> 
    ) : <div className='opacity-0'>

    </div>
};

export default Product;