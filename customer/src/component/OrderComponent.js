import React ,{useState,useEffect}from 'react'
import OrderCard from "../component/OrderCard";
import { useSelector } from 'react-redux';
import axios from "axios";
const OrderComponent = () => {
    const [orders, setOrders] = useState(null);
    const user=useSelector(state=>state.auth.user)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if(user!=null )
            {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getOrdersByUserId/${user._id}`);
            console.log(response);
            setOrders(response.data);
            }
          }
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData(); 
      }, []);

  return (
    <>
    <h1 className="text-xl font-semibold pb-5 capitalize">
              Order Detail
            </h1>
            {/* <OrderCard items={order}/> */}
            <div className="w-full flex flex-wrap  gap-2 justify-evenly ">
              {  orders!=null
                ? orders.map((order) =>  <OrderCard key={order._id} order={order} />):<></>
              }
            </div>
    </>
  )
}

export default OrderComponent