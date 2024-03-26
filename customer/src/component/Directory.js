import React from 'react'
import CategoryCard from './CategoryCard'

const Directory = () => {
  return (
 <div className='w-screen h-screen'>
       <div className='w-full h-full relative' >
        <img src={require('../images/3.jpg')} className='w-full h-full absolute'/> 
       </div>

     <div className='w-full flex justify-center items-center'>
       <div className='flex min-h-screen w-4/5 items-center justify-around flex-wrap'>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
       </div>
     </div>
 </div>
  )
}

export default Directory