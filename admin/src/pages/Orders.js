import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Orders = () => {
    const { status } = useParams()
    const [orders, setOrders] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (status === 'pending')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getPendingOrders`)
                else if (status === 'dispatched')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getDispatchedOrders`)
                else if (status === 'ontheway')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getOnTheWayOrders`)
                else if (status === 'delivered')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getDeliveredOrders`)
                else if (status === 'cancelled')
                    response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getCancelledOrders`)
                setOrders(response.data)
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }
    , [status])

    const handleStartDelivery = async (orderId) => {
        try {
            if (orderId != null) {
                const response = await axios.patch(`${process.env.REACT_APP_URL}/api/v1/order/onTheWayOrder/${orderId}`);
                console.log(response);
                setOrders(orders.filter(order => order._id !== orderId))
               
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleDeliveredOrder = async (orderId) => {
        try {
            if (orderId != null) {
                const response = await axios.patch(`${process.env.REACT_APP_URL}/api/v1/order/deliveredOrder/${orderId}`);
                console.log(response);
                // setOrders(orders.map(order => order._id == orderId ? { ...order, deliveryStatus: 'delivered' } : order))
                setOrders(orders.filter(order => order._id !== orderId))

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="pt-6 pb-12 bg-gray-300">
            <div id="card" className="">
                <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">orders</h2>
                <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">

                    {
                        orders != null && orders.map((order, index) => (
                            <div key={order._id} className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2 hover:scale-105 duration-200 cursor-pointer">
                                <div className="h-64 w-auto md:w-1/2">
                                    <img className="inset-0 h-full w-full object-cover object-center" src={order.img} />
                                </div>
                                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                    <div class={`w-24 ${order.deliveryStatus=="pending" && 'bg-yellow-500'} ${order.deliveryStatus=="cancelled" && 'bg-red-500'} ${order.deliveryStatus=="dispatched" && 'bg-blue-500'} ${order.deliveryStatus=="delivered" && 'bg-green-500'} ${order.deliveryStatus=="ontheway" && 'bg-purple-500'} center relative inline-block select-none whitespace-nowrap rounded-lg  py-2 px-3.5 align-baseline font-sans text-xs font-bold  leading-none text-black `}>
                                        <button class="mt-px uppercase" >{order.deliveryStatus}</button>
                                    </div>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        Order Id : {order._id}
                                    </p>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                    Seller Email : {order.sellerId.email}
                                    </p>
                                    <p className="mt-2">
                                        order items : {order.items.length}
                                    </p>
                                    <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        Price : {order.totalAmount}
                                    </p>
                                    
                                    {
                                        order.deliveryStatus=="dispatched" &&
                                        <button onClick={() => {handleStartDelivery(order._id)}} className="w-1/3 hover:bg-green-600 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-2 rounded-lg  focus:outline-none focus:shadow-outline">
                                        Start Delivery
                                    </button>
                                    }
                                    {
                                        order.deliveryStatus=="ontheway" &&
                                        <button onClick={() => {handleDeliveredOrder(order._id)}} className="w-1/3 hover:bg-green-600 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                        Delivered
                                    </button>
                                    }
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export default Orders