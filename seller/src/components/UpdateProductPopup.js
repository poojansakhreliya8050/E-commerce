import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { useForm } from "react-hook-form";
import axios from "axios";
// import { useSelector } from "react-redux";



const UpdateProductPopup = ({ showModel, setShowModel, productId, setProductId }) => {
    console.log(productId);
    const { register, handleSubmit, reset } = useForm();
    //   const user = useSelector((state) => state.userData.user);

    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);

    const [productDescription, setProductDescription] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);




    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchProductById/${productId}`);
                console.log(response);
                setProductName(response.data.productName);
                setProductDescription(response.data.productDescription);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
                setCategoryId(response.data.categoryId);
                setSubCategoryId(response.data.subCategoryId);
                setImgUrl(response.data.img);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [productId]);

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

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (categoryId != null) {
                    const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryByCateroryId/${categoryId}`);
                    console.log(response);
                    setSubCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [categoryId]);

    if (!showModel) return;

    return (
        <div className="fixed inset-0 pt-20 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll">
            <div className="bg-white rounded-lg shadow-lg w-2/3 ">
                <div className="p-4">
                    <button className="z-50 float-right text-gray-600 hover:text-gray-800 text-3xl" onClick={() => { setShowModel(false);setProductId(null); }}>
                        &times;
                    </button>
                </div>

                {/* <div className='flex justify-center items-center w-full h-full bg-white  outline-none focus:outline-none'> */}
                
                    <div className="p-8  my-4 md:px-12 w-9/12  mr-auto ">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">Update PRODUCT</h1>
                        </div>

                        {/* category dropdown */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <div className="relative border border-gray-300 text-gray-900 bg-gray-100 focus:outline-none focus:shadow-outline">
                                <select className="appearance-none w-full py-1 px-2 bg-gray-100" name="whatever" id="frm-whatever" onChange={e => setCategoryId(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories != null && categories.map(category => <option key={category._id} value={category._id} selected={categoryId != null && categoryId == category._id}>{category.categoryTitle} </option>)}
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* subcategory dropdown */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <div className="relative border border-gray-300 text-gray-900 bg-gray-100 focus:outline-none focus:shadow-outline">
                                <select className="appearance-none w-full py-1 px-2 bg-gray-100" name="whatever" id="frm-whatever" onChange={e => setSubCategoryId(e.target.value)}>
                                    <option value="">Select SubCategory</option>
                                    {subCategories != null && subCategories.map(subCategory => <option key={subCategory._id} value={subCategory._id} selected={subCategoryId != null && subCategoryId == subCategory._id}>{subCategory.subCategoryTitle}</option>)}
                                </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={productName} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Product name*" onChange={e => setProductName(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={productDescription} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Product description*" onChange={e => setProductDescription(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            Price : <input value={price} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="number" placeholder="Price*" onChange={e => setPrice(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            Quantity : <input value={quantity} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="number" placeholder="quantity*" onChange={e => setQuantity(e.target.value)} />
                        </div>


                        <div className="my-4">
                            <ImageUpload setImage={setImage} imgUrl={imgUrl} />
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4 ">
                            <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Update Product
                            </button>
                        </div>
                    </div>

                {/* </div> */}
                <div className="p-4 border-t">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowModel(false);setProductId(null); }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};



export default UpdateProductPopup