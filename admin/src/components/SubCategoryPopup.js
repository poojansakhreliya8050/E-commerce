import React, { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import axios from 'axios'



const SubCategoryPopup = ({setIsOpen, isUpdate, setIsUpdate ,categoryId,subCategoryId,setSubCategoryId}) => {

    console.log(subCategoryId,categoryId);

    // const [categoryId,setCategoryId]=useState("")
    const [subCategoryTitle, setSubCategoryTitle] = useState("");
    const [subCategoryDescription, setSubCategoryDescription] = useState("");
    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState(null);

   
    const addSubCategory = async (e) => {
        e.preventDefault();

        console.log(categoryId,subCategoryTitle, subCategoryDescription,image);

        if (categoryId==null || subCategoryTitle == "" || subCategoryDescription == "" || image == null)
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
        setIsUpdate(false);
        setIsOpen(false);
        setSubCategoryId(null)
        console.log(res);

    }

    const updateSubCategory=async(e)=>{
        e.preventDefault();

        console.log(subCategoryTitle, subCategoryDescription,imgUrl,categoryId);

        if (subCategoryTitle == "" || subCategoryDescription == "" || (image == null && imgUrl==null) || subCategoryId==null)
            return;

        console.log(image);

        const formData = new FormData();
        if(image!=null)
        formData.append('image', image);
        else
        formData.append('image', imgUrl);

        formData.append('subCategoryTitle', subCategoryTitle);
        formData.append('description', subCategoryDescription);

        const res = await axios.put(`${process.env.REACT_APP_URL}/api/v1/subCategory/updateSubCategory/${subCategoryId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        setIsUpdate(false);
        setIsOpen(false);
        setSubCategoryId(null)
        console.log(res);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(subCategoryId!=null){
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryById/${subCategoryId}`);
                // console.log(response);
                setSubCategoryTitle(response.data.subCategoryTitle);
                setSubCategoryDescription(response.data.description);
                setImgUrl(response.data.image);
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [subCategoryId]);

    return (
        <div className="container mx-auto my-4 px-4 w-full">
            <div className="w-full p-8 my-4 md:px-12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                <div className="flex">
                    <h1 className="font-bold uppercase text-5xl">{isUpdate ? 'UPDATE SUBCATEGORY' : 'ADD SUBCATEGORY'}</h1>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                    <input value={subCategoryTitle} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="SubCategory title*" onChange={e => setSubCategoryTitle(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                    <input value={subCategoryDescription} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="SubCategory description*" onChange={e => setSubCategoryDescription(e.target.value)} />
                </div>
                <div className="my-4">
                    <ImageUpload setImage={setImage} imgUrl={imgUrl} />
                </div>
                <div className="my-2 w-1/2">
                    {
                        isUpdate ? <button onClick={updateSubCategory} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                            Update SubCategory
                        </button> :
                            <button onClick={addSubCategory} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Add SubCategory
                            </button>
                    }

                </div>
            </div>

        </div>
    )
}

export default SubCategoryPopup