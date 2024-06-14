import React,{useState,useEffect} from 'react'
import axios from 'axios'

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
            } catch (err) {
                console.log(err);
            }
        },300)

        return () => {
            clearTimeout(i)
        }
    }, [search])

    return (
        <div className=" h-4/5 bg-white rounded-full border-none p-3 shadow-lg w-1/3 ">
            <div className="flex items-center">
                <i className="px-3 fas fa-search ml-1"></i>
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder="search Product..." className="ml-3 focus:outline-none w-full" />
            </div>
        </div>
    )
}

export default SearchBar