import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';

const Product = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProduct`);
                console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // call the function to fetch data when the component mounts
    }, []);

  return (
    <div className='w-screen flex-col items-center content-evenly justify-evenly'>
        {
            products!=null?
            products.map(product=><ProductCard key={product._id} product={product} />):<></>
        }
    </div>
  )
}

export default Product