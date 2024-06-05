import React, { useState } from 'react';
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import { useEffect } from 'react';
import Popup from '../components/Popup';
import CategoryPopup from '../components/CategoryPopup';
import SubCategoryPopup from '../components/SubCategoryPopup';

const Category = () => {

    const [categories, setCategories] = useState(null);

    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);



    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCategoryUpdate, setIsCategoryUpdate] = useState(false);

    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
    const [isSubCategoryUpdate, setIsSubCategoryUpdate] = useState(false);


    //fectch all category
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/fetchAllCategory`);
                console.log(res);
                setCategories(res.data);
            }
            fetchData();
        }
        catch (err) {
            console.log(err);
        }
    }, [])


    return (
        <div>
            <div className="flex-col justify-center items-center w-full h-full bg-white">


                <div className=" flex justify-end items-end my-2 w-4/5">
                    <button onClick={() => setIsCategoryOpen(true)} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                        Add Category
                    </button>
                </div>

                {
                    categories != null && categories.map(category => <Dropdown key={category._id} category={category} setMainCategoryId={setCategoryId} setIsCategoryUpdate={setIsCategoryUpdate} setMainisCategoryOpen={setIsCategoryOpen} setMainSubCategoryId={setSubCategoryId} setIsSubCategoryUpdate={setIsSubCategoryUpdate} setMainisSubCategoryOpen={setIsSubCategoryOpen}/>)
                }

                {
                    isCategoryOpen && <Popup isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} setIsUpdate={setIsCategoryUpdate}><CategoryPopup setIsOpen={setIsCategoryOpen} isUpdate={isCategoryUpdate} setIsUpdate={setIsCategoryUpdate} categoryId={categoryId} setCategoryId={setCategoryId} /></Popup>
                }


                {
                    isSubCategoryOpen && <Popup isOpen={isSubCategoryOpen} setIsOpen={setIsSubCategoryOpen} setIsUpdate={setIsSubCategoryUpdate}><SubCategoryPopup setIsOpen={setIsSubCategoryOpen} isUpdate={isSubCategoryUpdate} setIsUpdate={setIsSubCategoryUpdate} categoryId={categoryId} subCategoryId={subCategoryId} setSubCategoryId={setSubCategoryId}/></Popup>
                }





            </div>

        </div>
    )

}

export default Category