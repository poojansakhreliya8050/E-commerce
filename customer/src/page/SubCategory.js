import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubCategorySlider from '../component/SubCategorySlider';


const SubCategory = () => {
    const [subCategories, setSubCategories] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchAllSubCategory`);
          console.log(response);
          setSubCategories(response.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // call the function to fetch data when the component mounts
    }, []);
  return (
    <div>
        {subCategories!=null &&
        <SubCategorySlider subCategories={subCategories}/>
        }
    </div>
  )
}

export default SubCategory