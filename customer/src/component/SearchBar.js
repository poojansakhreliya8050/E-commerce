import React from 'react'

const SearchBar = () => {
    return (
        <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
            <div className="flex items-center">
                <i className="px-3 fas fa-search ml-1"></i>
                <input type="text" placeholder="Buscar..." className="ml-3 focus:outline-none w-full" />
            </div>
        </div>
    )
}

export default SearchBar