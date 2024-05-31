import React from 'react'

const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <div className="w-4/5 h-48 bg-white rounded-lg p-4">

            <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">

                <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 w-1/5">
                    <img src={product.img} alt="" className="w-32 h-32 object-cover rounded-lg" />
                </div>

                <div class="w-4/5 h-full lg:w-4/5 xl:w-4/5 px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                    <div class="flex flex-row lg:justify-start justify-center">
                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <p className="text-sm text-gray-500">Price: Rs.{product.price}</p>
                        </div>
                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                        </div>
                    </div>
                    <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                        <h1 className="text-lg font-semibold">Product Name  {product.productName}</h1>
                    </div>
                    <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        Product Description: {product.productDescription}
                    </div>
                    <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        Status : 
                        {product.status=="active"? <div class="ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                            <div class="mt-px">Active</div></div>:
                            <div class="ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                            <div class="mt-px">Deactive</div></div>
                        }
                    </div>
                    <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <p className="text-sm text-gray-500">Rating : {product.rating}</p>
                    </div>
                </div>

                <div class="w-1/5 h-full  px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                       <button>Update</button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard