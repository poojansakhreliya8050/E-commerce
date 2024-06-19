import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
// import ReviewCard from '../component/ReviewCard'
// import ReceiveReview from '../component/ReceiveReview'

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Home