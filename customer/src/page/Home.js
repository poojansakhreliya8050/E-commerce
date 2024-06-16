import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import ReviewCard from '../component/ReviewCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ReviewCard review={{
        image: 'url-to-image',
        title: 'Review Title',
        description: 'Review Description',
        author: 'Author Name',
        rating: 'Rating'
      }} /> */}

    </>
  )
}

export default Home