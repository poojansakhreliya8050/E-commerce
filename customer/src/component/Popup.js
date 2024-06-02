// components/Popup.js
import React from 'react';

const Popup = ({ isOpen, setIsOpen, }) => {
    if (!isOpen) return;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">

                <div className="p-4 ">
                    <button className="float-right text-gray-600 hover:text-gray-800 text-3xl" onClick={() => { setIsOpen(false) }}>
                        &times;
                    </button>
                </div>


                <div className="p-4 flex ">

                    <div class="relative pl-3 w-1/3 my-5 overflow-y-scroll">

                        <div class="flex flex-col w-full font-medium">

                            <div>
                                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                    <a href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Sort</a>
                                </span>
                            </div>


                            <div>
                                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                    <a href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Brand</a>
                                </span>
                            </div>

                            <div>
                                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                    <a href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Settings</a>
                                </span>
                            </div>


                            <div>
                                <span class="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                                    <a href="javascript:;" class=" cursor-pointer hover:text-red-600 flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Users</a>
                                </span>
                            </div>


                        </div>

                    </div>

                    <div class="relative pl-3  m-10">

                        <div class="max-w-lg mx-auto">

                            <fieldset class="mb-5">
                                <legend class="sr-only">
                                    Countries
                                </legend>

                                <div class="flex items-center mb-4">
                                    <input id="country-option-1" type="radio" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                                        <label for="country-option-1" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                            Price : Low to High
                                        </label>
                                </div>

                                <div class="flex items-center mb-4">
                                    <input id="country-option-1" type="radio" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                                        <label for="country-option-1" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                            Price : High to Low
                                        </label>
                                </div>

                                <div class="flex items-center mb-4">
                                    <input id="country-option-1" type="radio" name="countries" value="USA" class=" h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                                        <label for="country-option-1" class="text-[1.15rem]  font-medium text-gray-500 ml-2 block cursor-pointer">
                                            Cutomer Review
                                        </label>
                                </div>

                                

                                {/* <div class="flex items-center">
                                    <input id="option-disabled" type="radio" name="countries" value="China" class="h-4 w-4 border-gray-200 focus:ring-2 focus:ring-blue-300" aria-labelledby="option-disabled" aria-describedby="option-disabled" disabled=""/>
                                        <label for="option-disabled" class="text-sm font-medium text-gray-400 ml-2 block">
                                            China (disabled)
                                        </label>
                                </div> */}

                            </fieldset>

                        </div>

                    </div>




                </div>



                <div className="p-4 border-t">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setIsOpen(false) }}>
                        Close
                    </button>
                </div>


            </div>
        </div>
    );
};

export default Popup;
