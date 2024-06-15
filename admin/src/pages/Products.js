import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProduct`);
                console.log(response);
                setProducts(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pt-6 pb-12 bg-gray-300">
            <div id="card" className="">
                <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">Products</h2>
                <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">

                    {
                        products != null && products.map((product, index) => (
                            <div key={product._id} className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2 hover:scale-105 duration-200 cursor-pointer">
                                <div className="h-64 w-auto md:w-1/2">
                                    <img className="inset-0 h-full w-full object-cover object-center" src={product.img} />
                                </div>
                                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                    <div class={`w-20 ${product.status=="active" && 'bg-green-500'} ${product.status=="deactive" && 'bg-red-500'} center relative inline-block select-none whitespace-nowrap rounded-lg  py-2 px-3.5 align-baseline font-sans text-xs font-bold  leading-none text-black `}>
                                        <button class="mt-px uppercase" >{product.status}</button>
                                    </div>
                                    <h3 className="font-semibold text-lg leading-tight truncate">Product Name : {product.productName}</h3>
                                    <p className="mt-2">
                                        Product Description : {product.productDescription}
                                    </p>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        Price : {product.price}
                                    </p>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        Category : {product.categoryId.categoryTitle}
                                    </p>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        SubCategory : {product.subCategoryId.subCategoryTitle}
                                    </p>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default Products