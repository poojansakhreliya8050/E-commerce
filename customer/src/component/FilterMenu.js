import React,{useState} from 'react'

const FilterMenu = ({setFilterChoice,filterChoice}) => {
    const[menuName,setMenuName]=useState('sort')

    return (
        <>

            <div class="relative pl-3 w-1/3 my-5 overflow-y-scroll">

                <div class="flex flex-col w-full font-medium">

                    <div>
                        <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <p onClick={()=>setMenuName("sort")} href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Sort</p>
                        </span>
                    </div>


                    <div>
                        <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <p onClick={()=>setMenuName("brand")} href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Brand</p>
                        </span>
                    </div>

                    <div>
                        <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <p href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Settings</p>
                        </span>
                    </div>


                    <div>
                        <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <p href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Users</p>
                        </span>
                    </div>


                </div>

            </div>

            <div class="relative pl-3  m-10">

                <div class="max-w-lg mx-auto">

                

                    { menuName=="sort" && <fieldset class="mb-5">
                        
                        <div class="flex items-center mb-4">
                            <input onChange={()=>setFilterChoice("lowToHigh")} checked={filterChoice === "lowToHigh"} id="lowToHigh" type="radio" name="sort" value="lowToHigh" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="lowToHigh" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                Price : Low to High
                            </label>
                        </div>

                        <div class="flex items-center mb-4">
                            <input onChange={()=>setFilterChoice("highToLow")} checked={filterChoice === "highToLow"} id="highToLow" type="radio" name="sort" value="highToLow" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="highToLow" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                Price : High to Low
                            </label>
                        </div>

                        <div class="flex items-center mb-4">
                            <input onChange={()=>setFilterChoice("customerReview")} checked={filterChoice === "customerReview"} id="customerReview" type="radio" name="sort" value="customerReview" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="customerReview" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                Cutomer Review
                            </label>
                        </div>
                    </fieldset>}

                    { menuName=="brand" && <fieldset class="mb-5">
                        
                        <div class="flex items-center mb-4">
                            <input id="country-option-1" type="checkbox" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="country-option-1" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                PUMA
                            </label>
                        </div>

                        <div class="flex items-center mb-4">
                            <input id="country-option-2" type="checkbox" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="country-option-2" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                ADIDAS
                            </label>
                        </div>

                        <div class="flex items-center mb-4">
                            <input id="country-option-3" type="checkbox" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label for="country-option-3" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                ZARA
                            </label>
                        </div>



                        {/* <div class="flex items-center">
                <input id="option-disabled" type="radio" name="countries" value="China" class="h-4 w-4 border-gray-200 focus:ring-2 focus:ring-blue-300" aria-labelledby="option-disabled" aria-describedby="option-disabled" disabled=""/>
                    <label for="option-disabled" class="text-sm font-medium text-gray-400 ml-2 block">
                        China (disabled)
                    </label>
            </div> */}

                    </fieldset>}

                </div>

            </div>

        </>
    )
}

export default FilterMenu