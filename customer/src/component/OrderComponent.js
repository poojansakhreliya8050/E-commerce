import React ,{useState,useEffect}from 'react'
import OrderCard from "../component/OrderCard";
import { useSelector } from 'react-redux';
import axios from "axios";
const OrderComponent = () => {
    const [order, setOrder] = useState(null);
    const user=useSelector(state=>state.userData.user)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            if(user!=null && user?.accessToken!="" && user.accessToken!=null)
            {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/order/getOrders/${user.userdata._id}`);
            // console.log(response);
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
    <>
    <h1 className="text-xl font-semibold pb-5 capitalize">
              Order Detail
            </h1>
            {/* <OrderCard items={order}/> */}
            <div className="w-full flex flex-wrap  gap-2 justify-evenly ">
              {  order!=null
                ? order.map((item) =>  <OrderCard key={item._id} items={item} />):<></>
              }
            </div>
    </>
  )
}

export default OrderComponent