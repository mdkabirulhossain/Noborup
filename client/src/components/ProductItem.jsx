import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import {Link} from 'react-router'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);

    //Ensure image is and array
    const productImage = Array.isArray(image) && image.length > 0? image[0] : "placeholder.jpg"
    return (
         <Link to={id ? `/product/${id}` : "#"} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={productImage} alt={name} />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='font-medium text-sm'>{currency}{price}</p>
         </Link>
    );
};

export default ProductItem;