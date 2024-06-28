import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../tailwindCss/ProductImageCarousel.css";


const ProductImageCarousel = ({ images }) => {
  const CustomPaging = (i) => {
    return (
      // <div className='h-5 md:h-3 lg:h-[1.5rem] lg:w-[2rem] ml-2'>
      //   <img src={images[i]} alt={`dot-${i}`} class=" object-cover w-full h-full"/>
      // </div>
      <div className="w-12 h-12 overflow-hidden border-2 border-transparent  transition-colors duration-300">
      <img src={images[i]} alt={`dot-${i}`} className="w-full h-full object-cover grayscale" />
    </div>
    );
  };

  const settings = {
    customPaging: CustomPaging,
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='h-48 md:h-56 lg:h-[18rem] '>
            <img src={image} alt={`product-${index}`} class=" object-cover w-full h-full"/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} block bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} block bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default ProductImageCarousel;
