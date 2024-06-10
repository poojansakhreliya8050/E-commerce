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
                    console.log(response);
                    setOrders(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // call the function to fetch data when the component mounts
    }, []);

    return (
        <div className='w-screen flex justify-center'>
            <div className=' w-3/5 flex-col justify-around justify-items-center '>
                {
                    orders != null ?
                        orders.map(order =>

                            <div key={order._id} className='w-full border-2 mb-4 bg-slate-200'>

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