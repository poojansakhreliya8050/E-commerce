import React from 'react'
import { Link } from 'react-router-dom';

const CategoryCard = ({category}) => {
    // console.log(category);

    return (
        <div>
                <article className='group relative aspect-video h-96 w-[20rem] cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl m-4'>
                    <img className='absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300'
                        src={category.image}
                        alt='image'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/0 to-transparent to-90% text-white transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-black/60 group-hover:transition-all group-hover:duration-500'>
                        <h2 className='absolute bottom-8 left-8 m-0 font-extrabold uppercase transition-all delay-300 duration-100 ease-out group-hover:bottom-1/2 group-hover:delay-0 group-hover:duration-300'>{category.categoryTitle}</h2>
                        <p className='absolute left-8 top-1/2 line-clamp-3 max-w-[80%] pt-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:delay-500 group-hover:duration-300'>{category.description}</p>
                        <Link className='absolute bottom-8 left-8 max-w-[80%] rounded-lg border px-4 py-2 uppercase opacity-0 transition-opacity ease-out group-hover:opacity-100 group-hover:transition-opacity group-hover:delay-500 group-hover:duration-300' to={`category/${category._id}`}>find out more</Link>
                    </div>
                </article>
        </div>
    )
}

export default CategoryCard 