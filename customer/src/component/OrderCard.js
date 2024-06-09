import React,{useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { BsArrowRightCircle } from "react-icons/bs";

const OrderCard = ({ items }) => {
  // console.log(items);

 let totalAmount=items.subOrders[0].items.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="flex w-[32%] relative  text-gray-900 antialiased">
      <div>
        <div className="overflow-hidden w-full  rounded-lg">
        <img src={items?.subOrders[0]?.items[0]?.productId?.img} alt=" random imgee" className=" w-full rounded-lg object-cover object-center hover:scale-110 shadow-md transition-all duration-300" />
        </div>
        <Link to={`/orderDetails/${items._id}`}>
          <div className="relative group -mt-16 px-4 hover:skew-x-1 transition-all duration-500">
            <div className="rounded-lg bg-orange-200 p-5 shadow-lg">
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(items.createdAt, "dd")} &bull;{" "}
                  {dateFormat(items.createdAt, "mm")} &bull;{" "}
                  {dateFormat(items.createdAt, "yyyy")}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(items.createdAt, "H")} :&nbsp;
                  {dateFormat(items.createdAt, "M")} 
                </div>
              </div>
              <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                {/* {items?.resturant?.name} */}
              </h4>
              <div className="mt-1 font-medium">
                ₹{totalAmount}
                <span className="text-sm text-gray-600"> /Total Amount</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-md font-semibold text-teal-600">
                  <div className={`py-1 my-2  px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold `}>
                    items no
                  </div>
                </span>
                <BsArrowRightCircle className="text-xl group-hover:translate-x-3 transition-all duration-500" />
              </div>
            </div>
          </div>
        </Link>
        {/* <div className='hidden'><CustomerOrderCard items={items}/></div>   */}
      </div>
    </div>
  );
};

export default OrderCard