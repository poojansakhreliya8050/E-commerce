import React from 'react'

const SubCategoryCard = ({ subCategory }) => {
    console.log(subCategory);
    return (
        <div className="w-60 h-64 m-1">
            <div className="bg-white shadow-md rounded-lg  dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                <div className='h-4/5'>
                    <img className="rounded-t-lg p-8 w-56 h-48" src={subCategory.image} alt="product image" />
                </div>
                <div className="px-4 pb-4 h-1/5">
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{subCategory.subCategoryTitle}</h3>
                </div>
            </div>
        </div>
    )
}

export default SubCategoryCard