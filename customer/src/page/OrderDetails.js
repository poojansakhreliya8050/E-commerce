import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import OrderTracking from '../component/OrderTracking';

const OrderDetails = () => {

  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const user = useSelector(state => state.userData.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user != null && user?.accessToken != "" && user.accessToken != null) {
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getOrder/${orderId}`);
          console.log(response);
          setOrder(response.data);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (


    <div>
      <h1 className="text-xl font-semibold pb-5 capitalize text-center">
        Order Detail
      </h1>
      <div className="w-full flex flex-wrap  gap-2 justify-evenly ">
        {order != null ?
          <h1 className="text-xl font-semibold pb-5 capitalize ">
            Order Id : {order._id}
          </h1> : <></>
        }
        {order != null
          ? order?.subOrders.map((subOrder) =>
          (

            <div className="w-screen h-screen">
              <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                <p className="text-sm text-gray-500">Seller Id: {subOrder._id}</p>
              </div>
              
                {
                  subOrder.items.map((item) => 
                    <div key={item._id} className="w-4/5 h-48 bg-white rounded-lg p-4">
                      <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">
    
                        <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 ">
                          <img src={item.productId.img} alt="" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
    
                        <div class="w-full h-full lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                          <div class="flex flex-row lg:justify-start justify-center">
                            <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                              <p className="text-sm text-gray-500">Price: Rs.{item.productId.price}</p>
                            </div>
                            <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                            <h1 className="text-lg font-semibold">{item.productId.productName}</h1>
                          </div>
    
                          <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                            {item.productId.productDescription}
                          </div>
                        </div>
    
                      </div>
                    </div>
                  )
                }
              

               <OrderTracking status={subOrder.status} />
            </div>


          )) : <></>
        }
      </div>
    </div >





  )
}

export default OrderDetails