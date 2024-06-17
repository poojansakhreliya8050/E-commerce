import React from 'react';

const ReviewCard = ({ review }) => {
  console.log(review);
  return (
    <div className="w-64 m-4">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
        <img className="rounded-t-lg" src={review.productId.img} alt="review" />
        <div className="p-4">
          <h2 className="font-bold mb-2 text-lg">{review.review}</h2>
        </div>
        <div className="flex items-center justify-between px-4 py-2  rounded-b-lg">
          <span className="bg-white rounded-full text-sm px-2">
            {
              [...Array(review.rating)].map(i => (
                <button className={`text-yellow-500 fill-current w-6 h-6`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                      d="M10 0l3.091 6.327 6.909.999-4.999 4.87 1.182 6.858L10 16.673l-6.182 3.34L5.999 9.14 0.09 8.141l6.909-.999L10 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              ))
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;