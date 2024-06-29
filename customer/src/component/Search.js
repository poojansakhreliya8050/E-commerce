// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";



const Search = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        let i = setTimeout(async () => {
            try {
                if (search != '') {
                    const product = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/searchProducts/?query=${search}`);
                    setProducts(product.data)
                    console.log(product.data);
                }
                else {
                    setProducts([])
                }
            } catch (err) {
                console.log(err);
            }
        }, 300)

        return () => {
            clearTimeout(i)
        }
    }, [search])

    const handleProductClick = () => {
        setProducts([]);
      };

    return (
        <div className="relative w-full max-w-lg">
            {/* <input
                type="text"
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded-lg"
            /> */}
        <div className=" h-4/5  bg-gray-200 rounded-full p-3 shadow-lg  hover:border-2 hover:border-slate-500 ">
            <div className="flex items-center">
            <FaSearch className='ml-2'/>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}  placeholder="search Product..." className="ml-3 bg-inherit focus:outline-none w-full" />
            </div>
            </div>

            {products.length > 0 && (
                <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                    {products.map((product) => (
                        <Link to={`/productDetails/${product._id}`}
                            key={product._id}
                            className="p-4 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 flex"
                            onClick={handleProductClick}
                        >
                            <img src={product.img[0]} alt="Product" className="w-10 h-10 object-cover rounded-lg" />
                            <p className='ml-4'>
                                {product.productName}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
