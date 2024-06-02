import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Popup from '../component/Popup'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Popup show={false}/>
    </>
  )
}

export default Home