import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubCategoryCard from './SubCategoryCard';

const SubCategorySlider = ({subCategories,setSubCategoryId}) => {

    // console.log(subCategories.length);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: subCategories.length>=5?5:4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };

    return (
        <div>
            <div className="slider-container">
                <Slider {...settings}>
               { subCategories.map(subCategory=><SubCategoryCard key={subCategory._id} subCategory={subCategory} setSubCategoryId={setSubCategoryId}/>)}
                </Slider>
            </div>
        </div>
    )
}

export default SubCategorySlider