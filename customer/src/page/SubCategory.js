import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubCategorySlider from '../component/SubCategorySlider';
import Productcard from '../component/ProductCard';
import { useParams } from 'react-router-dom';
import Loading from '../component/Loading';

const SubCategory = () => {
    const {categoryId}=useParams()
    console.log(categoryId);
    const [subCategories, setSubCategories] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);
    const [products, setProducts] = useState(null);

    
        useEffect(() => {
          const fetchData = async () => {
            try {
              if(categoryId==undefined)
              {
              const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProduct`);
              console.log(response);
              setProducts(response.data); 
              setSubCategories(null);
              setSubCategoryId(null);
              }
            }
            catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData(); // call the function to fetch data when the component mounts
        }, []);
      

    useEffect(() => {
      const fetchData = async () => {
        try {
          if(categoryId!=undefined){
            console.log(categoryId);
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryByCateroryId/${categoryId}`);
          console.log(response);
          setSubCategories(response.data); 
         
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // call the function to fetch data when the component mounts
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if(categoryId!=undefined){
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProductByCategoryId/${categoryId}`);
          console.log(response);
          setProducts(response.data); 
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(); // call the function to fetch data when the component mounts
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if(subCategoryId!=null){
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProductBySubCategoryId/${subCategoryId}`);
          console.log(response);
          setProducts(response.data); 
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(); // call the function to fetch data when the component mounts
    }, [subCategoryId]);

   

  return (
    <div>
        {subCategories!=null &&
        <SubCategorySlider subCategories={subCategories} setSubCategoryId={setSubCategoryId}/>
        }
        <div className='flex flex-wrap'>
          
          {
            products==null ? <Loading/>:
            products.map(product=><Productcard key={product._id} product={product}/>)
          }


        </div>
    </div>
  )
}

export default SubCategory