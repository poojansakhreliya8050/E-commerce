import React,{useState,useEffect} from 'react'
import { IoFilter } from "react-icons/io5";
import Popup from './Popup';
import FilterMenu from './FilterMenu';
import SearchBar from './SearchBar'


const FilterHeader = ({filterData,setFilterData,products}) => {
    const [isOpen,setIsOpen]=useState(false)
    const [filterChoice, setFilterChoice] = useState(null);

    useEffect(() => {

        if(filterChoice!=null && filterData!=null){
            let filtered;
            
            if(filterChoice=="lowToHigh")
             filtered=filterData.sort((a,b)=>a.price-b.price);
            else if(filterChoice=="highToLow")
             filtered=filterData.sort((a,b)=>b.price-a.price);
            else if(filterChoice=="customerReview")
             filtered=filterData.sort((a,b)=>b.rating-a.rating);

            
            // console.log(filtered);
            setFilterData([...filtered]);
            // console.log(filterData);
        }
        else if(filterChoice!=null && products!=null){
            let filtered;
            
            if(filterChoice=="lowToHigh")
             filtered=products.sort((a,b)=>a.price-b.price);
            else if(filterChoice=="highToLow")
             filtered=products.sort((a,b)=>b.price-a.price);
            else if(filterChoice=="customerReview")
             filtered=products.sort((a,b)=>b.rating-a.rating);

            
            // console.log(filtered);
            setFilterData([...filtered]);
            // console.log(filterData);
        }
  }
  , [filterChoice]);

  return (
        <header >
            <nav class="flex items-center z-10 w-screen mb-5 px-4 py-1 bg-slate-200 shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
                <SearchBar setFilterData={setFilterData}/>
                <div class="flex justify-end p-4 w-full">
                    <div class="flex justify-center items-center justify-items-center space-x-4 text-lg font-semibold tracking-tight">
                        <button onClick={()=>{setIsOpen(true)}} class=" px-6 py-2 flex text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black">Filter
                        <IoFilter />
                        </button>
                    </div>
                </div>
            </nav>
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}> <FilterMenu setFilterChoice={setFilterChoice} filterChoice={filterChoice}/> </Popup>
        </header>
  )
}

export default FilterHeader