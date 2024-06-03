import React from 'react'
import { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import Popup from './Popup';
import FilterMenu from './FilterMenu';

const FilterHeader = ({setFilterChoice,filterChoice}) => {
    const [isOpen,setIsOpen]=useState(false)
  return (
        <header >
            <nav class="flex z-10 w-screen mb-5 px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
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