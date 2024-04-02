import React,{useState} from 'react'
import axios from 'axios'
import ImageUpload from '../components/ImageUpload'


const SubCategory = () => {
    const [subCategoryTitle,setSubCategoryTitle]=useState("");
    const [subCategoryDescription,setSubCategoryDescription]=useState("");
    const [image,setImage]=useState(null)
  
  
  
  const addSubCategory=async (e)=>{
      e.preventDefault();
  
      console.log(subCategoryTitle,subCategoryDescription);
  
      if(subCategoryTitle=="" || subCategoryDescription=="" ||image==null)
      return;
  
      console.log(image);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('subCategoryTitle', subCategoryTitle);
      formData.append('description', subCategoryDescription);
  
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/subCategory/addSubCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(res);
  
    }

  return (
    <div>
            <div className="flex justify-center items-center w-screen h-screen bg-white">
                <div className="container mx-auto my-4 px-4 lg:px-20">
                    <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">ADD SUBCATEGORY</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="SubCategory title*" />
                        </div>
                        <div className="my-4">
                            <ImageUpload/>
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button onClick={addSubCategory} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Add SubCategory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SubCategory