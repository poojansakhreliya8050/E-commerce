import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard'

const Directory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/fetchAllCategory`);
        console.log(response);
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // call the function to fetch data when the component mounts
  }, []);
  return (

 <div className='w-screen h-screen'>
       <div className='w-full h-full relative' >
        <img src={require('../images/3.jpg')} className='w-full h-full absolute'/> 
       </div>
        <h1 className='text-5xl font-bold text-center m-5'>Category</h1>
     <div className='w-full flex justify-center items-center'>
       <div className='flex min-h-screen w-4/5 items-center justify-around flex-wrap'>
          {
            categories.map(category=> <CategoryCard key={category._id} category={category} />)
          }
       </div>
     </div>
 </div>
  )
}

export default Directory