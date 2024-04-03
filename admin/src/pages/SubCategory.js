import React, { useState,useEffect } from 'react'
import axios from 'axios'
import ImageUpload from '../components/ImageUpload'


const SubCategory = () => {
    const [categoryId,setCategoryId]=useState("")
    const [subCategoryTitle, setSubCategoryTitle] = useState("");
    const [subCategoryDescription, setSubCategoryDescription] = useState("");
    const [image, setImage] = useState(null)

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/fetchAllCategory`);
          console.log(response);
          setCategories(response?.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // call the function to fetch data when the component mounts
    }, []);


    const addSubCategory = async (e) => {
        e.preventDefault();

        console.log(categoryId,subCategoryTitle, subCategoryDescription,image);

        if (categoryId=="" || subCategoryTitle == "" || subCategoryDescription == "" || image == null)
            return;

        const formData = new FormData();
        formData.append('image', image);
        formData.append("categoryId",categoryId);
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

                      {/* category deopdown */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                    <div className="relative border border-gray-300 text-gray-900 bg-gray-100 focus:outline-none focus:shadow-outline">
                                        <select className="appearance-none w-full py-1 px-2 bg-gray-100" name="whatever" id="frm-whatever" onChange={e=>setCategoryId(e.target.value)}>
                                            <option value="">Select Category</option>
                                            { categories.map(category=> <option key={category._id} value={category._id}>{category.categoryTitle}</option>)}
                                            
                                        </select>
                                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div> 
                        </div>

                     {/* subcategory title input */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="SubCategory title*" onChange={e=>setSubCategoryTitle(e.target.value)} />
                        </div>

                         {/* subcategory description input */}
                         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="SubCategory description*" onChange={e=>setSubCategoryDescription(e.target.value)} />
                        </div>

                     {/* image uploader */}
                        <div className="my-4">
                            <ImageUpload setImage={setImage}/>
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