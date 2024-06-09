import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';
import UpdateProductPopup from '../components/UpdateProductPopup';
import { useSelector } from 'react-redux'

const Product = () => {

    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const user = useSelector(state => state.userData.user)


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user != null && user.accessToken != null && user.accessToken != "") {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchProductByUserId/65f47716c1f778c761717e1b`);
                    console.log(response);
                    setProducts(response.data);
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
                    products != null ?
                        products.map(product => <ProductCard key={product._id} product={product} setProducts={setProducts} setShowModel={setShowModel} setProductId={setProductId} />) : <></>
                }
                {
                    showModel ? <UpdateProductPopup showModel={showModel} setShowModel={setShowModel} productId={productId} setProductId={setProductId} /> : <></>
                }
            </div>
        </div>

    )
}

export default Product