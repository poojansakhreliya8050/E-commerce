import React,{useState} from 'react'
import axios from 'axios';

const OrderCard = ({order}) => {
    console.log(order);
    return (
        <div className="w-full h-48 bg-white rounded-lg p-4 mb-3">

            <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">

                <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 w-1/5">
                    <img src={order.item.img} alt="" className="w-32 h-32 object-cover rounded-lg" />
                </div>

                <div class="w-4/5 h-full lg:w-4/5 xl:w-4/5 px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                    <div class="flex flex-row lg:justify-start justify-center">
                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <p className="text-sm text-gray-500">Price: Rs.{order.item.price}</p>
                        </div>
                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                            <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                        </div>
                    </div>
                    <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                        <h1 className="text-lg font-semibold">order Name : {order.item.productName}</h1>
                    </div>
                    <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        order Description : {order.item.productDescription}
                    </div>
                    {/* <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                        Status : 
                        {order.status=="active"? <div class="ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                            <button class="mt-px" onClick={()=>changeorderState()}>Active</button></div>:
                            <div class="ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-red-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                            <button class="mt-px" onClick={()=>changeorderState()}>Deactive</button></div>
                        }
                    </div> */}
                    {/* <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">   
                            <p className="text-sm text-gray-500">Rating : {order.rating}</p>
                    </div> */}
                </div>

                {/* <div class="w-1/5 h-full  px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                       <button onClick={()=>{setorderId(order._id);setShowModel(true);}}>Update</button>
                </div> */}
            </div>
        </div>
    )
}

export default OrderCard