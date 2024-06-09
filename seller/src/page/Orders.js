import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import OrderCard from '../components/OrderCard';

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
                        orders.map(order => <OrderCard key={order._id} order={order}/>) : <></>
                }
                
            </div>
        </div>

    )
}

export default Orders