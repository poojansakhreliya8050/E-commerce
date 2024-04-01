import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubCategoryCard from './SubCategoryCard';
import Card from './Card';

const SubCategorySlider = ({subCategories}) => {

    console.log(subCategories);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
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
               { subCategories.map(subCategory=><SubCategoryCard subCategory={subCategory}/>)}
                </Slider>
            </div>

        </div>
    )
}

export default SubCategorySlider