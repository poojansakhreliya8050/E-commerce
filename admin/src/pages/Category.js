import React, { useState } from 'react';
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import { useEffect } from 'react';
import Popup from '../components/Popup';
import CategoryPopup from '../components/CategoryPopup';

const Category = () => {

    const [category, setCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
   

    //fectch all category
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/fetchAllCategory`);
                console.log(res);
                setCategory(res.data);
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
                    <button onClick={()=>setIsOpen(true)}  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline">
                        Add Category
                    </button>
                </div>

                {
                    category != null && category.map(category => <Dropdown key={category._id} category={category} />)
                }

                {
                    isOpen && <Popup isOpen={isOpen} setIsOpen={setIsOpen}><CategoryPopup/></Popup>
                }


            </div>

        </div>
    )

}

export default Category