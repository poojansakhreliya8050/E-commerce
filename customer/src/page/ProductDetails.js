import React from 'react'
import ProductImageCarousel from '../component/ProductImageCarousel'


const ProductDetails = () => {
    const imageArray = [
        "http://res.cloudinary.com/dkffxyhkn/image/upload/v1713028136/hdowereud82ohhvbjfv4.jpg",
        "http://res.cloudinary.com/dkffxyhkn/image/upload/v1716647329/wfqmskwasyfeyszfxgbl.jpg",
        "http://res.cloudinary.com/dkffxyhkn/image/upload/v1719152370/t6doecrs0mpf5kdszwwi.jpg",
        "http://res.cloudinary.com/dkffxyhkn/image/upload/v1719418732/wxisge63ra7m3psjeavs.jpg",
        "http://res.cloudinary.com/dkffxyhkn/image/upload/v1713028136/hdowereud82ohhvbjfv4.jpg",

        ]
  return (
    <div className='w-screen h-screen'>
        <div className='w-2/3 lg:w-1/3 mt-24'>
         <ProductImageCarousel images={imageArray}/>
        </div>
        
    </div>
  )
}

export default ProductDetails