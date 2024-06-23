import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ImageUpload from '../components/ImageUpload'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const AddProduct = () => {
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);

    const[productDescription,setProductDescription]=useState("");
    const[productName,setProductName]=useState("");
    const[price,setPrice]=useState(0);
    const[quantity,setQuantity]=useState(0);

    const user = useSelector(state => state.userData.user)
    const navigate=useNavigate();




    const [image, setImage] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(categoryId!=null){
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/subCategory/fetchSubCategoryByCateroryId/${categoryId}`);
                console.log(response);
                setSubCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // call the function to fetch data when the component mounts
    }, [categoryId]);


    const addProduct = async (e) => {
        e.preventDefault();
 
        try{
        if (categoryId == null || subCategoryId == null || productName==""|| productDescription=="" ||price==""||quantity==""|| image == null || user == null)
            return;

        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('categoryId', categoryId);
        formData.append('subCategoryId', subCategoryId);
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('price', price); 
        formData.append('quantity', quantity);
        formData.append('userId', user.userdata._id);

        console.log(categoryId,subCategoryId,productName,productDescription,price,quantity);



        const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/product/addProduct`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(res);
        navigate('/products');
    }
    catch(e){
        console.log(e);
    }

    }

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-white'>
            <div className="flex justify-center items-center w-10/12 ">
                <div className="flex justify-center items-center container mx-auto my-4 px-4 lg:px-20">
                    <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold uppercase text-5xl">ADD PRODUCT</h1>
                        </div>

                        {/* category dropdown */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <div className="relative border border-gray-300 text-gray-900 bg-gray-100 focus:outline-none focus:shadow-outline">
                                <select className="appearance-none w-full py-1 px-2 bg-gray-100" name="whatever" id="frm-whatever" onChange={e => setCategoryId(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories != null && categories.map(category => <option key={category._id} value={category._id}>{category.categoryTitle}</option>)}
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
                                {subCategories != null && subCategories.map(subCategory => <option key={subCategory._id} value={subCategory._id}>{subCategory.subCategoryTitle}</option>)}
                            </select>
                                <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={productName} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Product name*" onChange={e=>setProductName(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <input value={productDescription} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="text" placeholder="Product description*" onChange={e=>setProductDescription(e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1  md:grid-cols-2 mt-5">
                            Price  <input value={price} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="number" placeholder="Price*" onChange={e=>setPrice(e.target.value)} />
                        </div>
 
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                           Quantity  <input value={quantity} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" type="number" placeholder="quantity*" onChange={e=>setQuantity(e.target.value)} />
                        </div>


                        <div className="my-4">
                            <ImageUpload setImage={setImage} />
                        </div>
                        <div className="my-2 w-1/2 lg:w-1/4">
                            <button onClick={addProduct} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct