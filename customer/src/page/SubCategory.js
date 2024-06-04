import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubCategorySlider from '../component/SubCategorySlider';
import Productcard from '../component/ProductCard';
import { useParams } from 'react-router-dom';
import Loading from '../component/Loading';
import FilterHeader from '../component/FilterHeader';

const SubCategory = () => {
    const {categoryId}=useParams()
    const [subCategories, setSubCategories] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);
    const [products, setProducts] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [filterChoice, setFilterChoice] = useState(null);

    
        useEffect(() => {
          const fetchData = async () => {
            try {
              if(categoryId==undefined)
              {
              const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchAllProduct`);
              // console.log(response);
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


   useEffect(() => {

        if(filterChoice!=null && products!=null){
            let filtered;
            
            if(filterChoice=="lowToHigh")
             filtered=products.sort((a,b)=>a.price-b.price);
            else if(filterChoice=="highToLow")
             filtered=products.sort((a,b)=>b.price-a.price);
            else if(filterChoice=="customerReview")
             filtered=products.sort((a,b)=>b.rating-a.rating);

            
            // console.log(filtered);
            setFilterData([...filtered]);
            // console.log(filterData);
        }
  }
  , [filterChoice]);




  return (
    <div className='mt-16'>
        {subCategories!=null &&
        <SubCategorySlider subCategories={subCategories} setSubCategoryId={setSubCategoryId}/>
        }
        <div className='flex flex-wrap'>
          <FilterHeader setFilterChoice={setFilterChoice} filterChoice={filterChoice}/>

          {
            products==null ? <Loading/>: filterData!=null && filterData.length!=0 ? filterData.map(product=><Productcard key={product._id} product={product}/>):
            products.map(product=><Productcard key={product._id} product={product}/>)
          }

        </div>
    </div>
  )
}

export default SubCategory