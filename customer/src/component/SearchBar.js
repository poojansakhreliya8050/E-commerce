import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";


const SearchBar = ({setFilterData}) => {
    const [search,setSearch]=useState('')

    useEffect(() => {

        let i=setTimeout(async () => {
            try {
                if(search!='') {
                const product = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/searchProducts/?query=${search}`);
                setFilterData(product.data)
                console.log(product.data);
                }
                else{
                    setFilterData(null)
                }
            } catch (err) {
                console.log(err);
            }
        },300)

        return () => {
            clearTimeout(i)
        }
    }, [search])

    return (
        <div className=" h-4/5 bg-white rounded-full p-3 shadow-lg w-1/3 hover:border-2 hover:border-slate-500 ">
            <div className="flex items-center">
            <FaSearch className='ml-2'/>
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder="search Product..." className="ml-3 focus:outline-none w-full" />
            </div>
        </div>
    )
}

export default SearchBar