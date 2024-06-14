import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import OrderCard from '../components/OrderCard';
import dateFormat from 'dateformat'

const Orders = () => {

    const [orders, setOrders] = useState(null);
    // const [showModel, setShowModel] = useState(false);
    const user = useSelector(state => state.userData.user)


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user != null && user.accessToken != null && user.accessToken != "") {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getOrderBySellerId/65f47716c1f778c761717e1b`);
                    // console.log(response);
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // call the function to fetch data when the component mounts
    }, []);

    const handelCancleOrder = async (orderId) => {
        try {
            if (orderId != null) {
                const response = await axios.patch(`${process.env.REACT_APP_URL}/api/v1/order/cancelledOrder/${orderId}`);
                console.log(response);
                // setOrder({ ...order, deliveryStatus: 'cancelled' });
                setOrders(orders.map(order => order._id == orderId ? { ...order, deliveryStatus: 'cancelled' } : order))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handelDispatchOrder = async (orderId) => {
        try {
            if (orderId != null) {
                const response = await axios.patch(`${process.env.REACT_APP_URL}/api/v1/order/dispatchedOrder/${orderId}`);
                console.log(response);
                // setOrder({ ...order, deliveryStatus: 'cancelled' });
                setOrders(orders.map(order => order._id == orderId ? { ...order, deliveryStatus: 'dispatched' } : order))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div className='w-screen flex justify-center'>
            <div className=' w-3/5 flex-col justify-around justify-items-center '>
                {
                    orders != null ?
                        orders.map(order =>

                            <div key={order._id} className='w-full border-2 mb-4 bg-slate-200'>


                                <div className='w-full flex justify-between'>

                                    <div className='w-3/5'>
                                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                                            <p className="text-sm text-gray-500">Customer Name: {order.userId.name}</p>
                                        </div>

                                        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                                            <p className="text-sm text-gray-500">Customer Name: {order.userId.email}</p>
                                        </div>

                                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-600 px-2">
                                            Order Date : &nbsp;
                                            {dateFormat(order.createdAt, "dd")} &bull;&nbsp;
                                            {dateFormat(order.createdAt, "mm")} &bull;&nbsp;
                                            {dateFormat(order.createdAt, "yyyy")}
                                        </div>
                                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-600 px-2">
                                            Time : &nbsp;&nbsp;{dateFormat(order.createdAt, "H")} :&nbsp;
                                            {dateFormat(order.createdAt, "M")}
                                        </div>
                                        <div className={`py-2 uppercase m-2  px-3 ${order.deliveryStatus != "approved" && 'bg-green-600'} ${order.deliveryStatus == "cancelled" && 'bg-red-600'} ${order.deliveryStatus == "pending" && 'bg-yellow-600'} flex order-center w-fit rounded-md text-white font-bold `}>
                                            {order.deliveryStatus}
                                        </div>
                                    </div>
                                    {
                                        order.deliveryStatus=="pending" &&
                                        <div className='w-2/5 flex flex-col '>
                                            <button onClick={(e) => handelCancleOrder(order._id)} className="w-2/3 hover:bg-red-500  mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                Cancle Order
                                            </button>
                                            <button onClick={(e) => handelDispatchOrder(order._id)} className="w-2/3 hover:bg-green-500  mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                dispatch Order
                                            </button>
                                        </div>
                                    }
                                </div>


                                {
                                    order.items.length > 0 ?
                                        order.items.map(item => <OrderCard key={item._id} order={item} />) : <></>
                                }

                                <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                                    <p className="text-sm text-gray-500">Total Amount: {order.totalAmount}</p>
                                </div>

                            </div>

                        ) : <></>


                }

            </div>
        </div>

    )
}

export default Orders