import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevent')

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }else{
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) =>{
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev =>prev.filter(item => item !== e.target.value))
        }else{
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () =>{
        // copy products 
        let productsCopy = [...products]; 

        if(showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if(category.length > 0){
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if(subCategory.length > 0){
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        // Apply sorting to the filtered products
        productsCopy = sortProducts(productsCopy);
        setFilterProducts(productsCopy);
    }

    // Modified sortProduct function to accept products as parameter
    const sortProducts = (productsToSort) => {
        let productsCopy = [...productsToSort];

        switch(sortType){
            case 'low-high':
                return productsCopy.sort((a, b) => (a.price - b.price));
            case 'high-low':
                return productsCopy.sort((a, b) => (b.price - a.price));
            default:
                return productsCopy;
        }
    }

    // Run applyFilter when filters or sort changes
    useEffect(()=>{
        applyFilter();
    }, [category, subCategory, search, showSearch, products, sortType])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>
            {/* Left side  */}
            {/* Filter  */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-4 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />

                </p>

                {/* Category Filter  */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden'} sm:block`}>
                    <p className='text-sm mb-3 font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
                        </p>

                    </div>
                </div>

                {/* Sub Category Filter  */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden'} sm:block`}>
                    <p className='text-sm mb-3 font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                        </p>

                    </div>
                </div>
            </div>
            {/* right side  */}
            <div className='flex-1 '>
                <div className='flex justify-between text-base sm:text-2xl my-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>

                    {/* Product Sort  */}
                    <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relevent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {/* Map Products  */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((product, index)=>(
                            <ProductItem key={index} id={product?._id} image={product?.image} name={product?.name} price={product?.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Collection;