import React from 'react'

const ProductSimmer = () => {
    return (
        <div class="flex flex-col m-4  rounded-lg shadow-lg w-[340px]">
            <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                <div class="lg:h-64 bg-gray-400 md:h-48 w-full object-cover object-center"></div>
                <div class="p-6">
                    <h1 class="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                    <p class="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
                    <p class="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
                    <p class="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
                </div>
            </div>
        </div>
    )
}

export default ProductSimmer