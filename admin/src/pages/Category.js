import React, { useState } from 'react';
import axios from 'axios'
import ImageUpload from '../components/ImageUpload'

const Category = ()  => {

  const [categoryTitle,setCategoryTitle]=useState("");
  const [categoryDescription,setCategoryDescription]=useState("");
  const [image,setImage]=useState(null)



const addCategory=async (e)=>{
    e.preventDefault();

    console.log(categoryTitle,categoryDescription);

    if(categoryTitle=="" || categoryDescription=="" ||image==null)
    return;

    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('categoryTitle', categoryTitle);
    formData.append('description', categoryDescription);

    const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/category/addCategory`, formData, {
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
                            <h1 className="font-bold uppercase text-5xl">ADD CATEGORY</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={categoryTitle} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Category title*" onChange={e=>setCategoryTitle(e.target.value)}/>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={categoryDescription} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Category description*" onChange={e=>setCategoryDescription(e.target.value)} />
                        </div>
                        <div className="my-4">
                            <ImageUpload setImage={setImage}/>
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button onClick={addCategory} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Add Category
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default Category