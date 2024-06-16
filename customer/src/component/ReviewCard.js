import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="w-64 m-4">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
        <img className="rounded-t-lg" src={review.image} alt="review" />
        <div className="p-4">
          <h2 className="font-bold mb-2 text-lg">{review.title}</h2>
          <p className="text-gray-700">{review.description}</p>
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 rounded-b-lg">
          <h3 className="text-sm text-white">{review.author}</h3>
          <span className="bg-white rounded-full text-sm text-gray-900 px-2">{review.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;