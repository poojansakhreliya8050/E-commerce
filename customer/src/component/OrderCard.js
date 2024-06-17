import React,{useState,useEffect  } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { BsArrowRightCircle } from "react-icons/bs";

const OrderCard = ({ order }) => {
  // console.log(order);

//  let totalAmount=order.subOrders[0].order.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="flex w-[32%] relative  text-gray-900 antialiased">
      <div>
        <div className="overflow-hidden w-full  rounded-lg">
        <img src={order?.items[0]?.item?.img} alt=" random imgee" className=" w-full rounded-lg object-cover object-center hover:scale-110 shadow-md transition-all duration-300" />
        </div>
        <Link to={`/orderDetails/${order._id}`}>
          <div className="relative group -mt-16 px-4 hover:skew-x-1 transition-all duration-500">
            <div className="rounded-lg bg-orange-200 p-5 shadow-lg">
              <div className="flex order-baseline justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(order.createdAt, "dd")} &bull;{" "}
                  {dateFormat(order.createdAt, "mm")} &bull;{" "}
                  {dateFormat(order.createdAt, "yyyy")}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {dateFormat(order.createdAt, "H")} :&nbsp;
                  {dateFormat(order.createdAt, "M")} 
                </div>
              </div>
              <h4 className="mt-1 truncate text-xl font-semibold uppercase leading-tight">
                {/* {order?.resturant?.name} */}
              </h4>
              <div className="mt-1 font-medium">
                ₹{order.totalAmount}
                <span className="text-sm text-gray-600"> /Total Amount</span>
              </div>
              <div className="mt-4 flex justify-between order-center">
                <span className="text-md font-semibold text-teal-600">
                  <div className={`py-2 uppercase my-2  px-3 ${ order.deliveryStatus!="approved" &&'bg-green-600'} ${ order.deliveryStatus=="cancelled" &&'bg-red-600'} ${ order.deliveryStatus=="pending" &&'bg-yellow-600'} flex order-center w-fit rounded-md text-white font-bold `}>
                    {order.deliveryStatus}
                  </div>
                </span>
                <BsArrowRightCircle className="text-xl group-hover:translate-x-3 transition-all duration-500" />
              </div>
            </div>
          </div>
        </Link>
        {/* <div className='hidden'><CustomerOrderCard order={order}/></div>   */}
      </div>
    </div>
  );
};

export default OrderCard