import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Demo from '../components/Demo'

const Home = () => {
  return (
    <div className='flex'>
    <Sidebar className="w-1/5"/>
    <div className='w-4/5'>
         <Outlet/>
    </div>
    </div>
  )
}

export default Home