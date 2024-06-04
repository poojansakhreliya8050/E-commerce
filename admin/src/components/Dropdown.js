import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { IoIosArrowDropdown } from "react-icons/io";

const Dropdown = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)

    const [subCategories, setSubCaterogies] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (categoryId != null) {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryByCateroryId/${categoryId}`);
                    console.log(response);
                    setSubCaterogies(response?.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // call the function to fetch data when the component mounts
    }, [categoryId]);





    return (
        <div className="text-left w-full m-10">
            <div>
                <div className="w-4/5 bg-white rounded-lg p-4 cursor-pointer">

                    <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">
                        <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 w-1/5">
                            <img src={category.image} alt="" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                        <div onClick={() => { setCategoryId(category._id); setIsOpen(!isOpen) }} class="w-4/5 h-full lg:w-4/5 xl:w-4/5 px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                            <div class="flex justify-between">
                                <div class="mb-2 ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-green-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                                    <button class="mt-px" >Category</button>
                                </div>
                                <IoIosArrowDropdown />

                            </div>
                            <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                <h1 className="text-lg font-semibold">Category Name : {category.categoryTitle}</h1>
                            </div>
                            <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                Category Description : {category.description}
                            </div>

                            <div className=" flex justify-around my-2 w-4/5">
                                <button className="mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                    Add SubCategory
                                </button>
                                <button className="mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {isOpen && (
                <div className="ml-24  w-4/5 rounded-md shadow-lg bg-gray-200  ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {
                            subCategories != null && subCategories.map(subCategory => (
                                // <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{subCategory.subCategoryTitle}</a>
                                <div className="w-4/5  m-5 bg-white rounded-lg p-4 cursor-pointer">

                                    <div class="lg:flex shadow rounded-lg border  border-gray-400 h-full">
                                        <div class=" rounded-lg lg:w-2/12 py-4 h-full shadow-inner ml-6 w-1/5">
                                            <img src={subCategory.image} alt="" className="w-24 h-24 object-cover rounded-lg" />
                                        </div>
                                        <div onClick={() => { setSubCategoryId(subCategory._id); }} class="w-4/5 h-full lg:w-4/5 xl:w-4/5 px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide ">
                                            <div class="mb-2 ml-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-yellow-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                                                <button class="mt-px" >SubCategory</button>
                                            </div>

                                            <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                                                <h1 className="text-lg font-semibold">SubCategory Name : {subCategory.subCategoryTitle}</h1>
                                            </div>
                                            <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                                                SubCategory Description : {subCategory.description}
                                            </div>
                                            <button onClick={() => setIsOpen(true)} className="mt-5 uppercase text-sm font-bold tracking-wide bg-gray-600 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                                                Update
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;