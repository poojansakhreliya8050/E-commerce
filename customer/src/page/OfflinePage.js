import React from 'react'

const OfflinePage = () => {
  return (
    <div className='w-screen h-screen' >
        <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-4xl font-bold'>You are offline</h1>
            <p className='text-lg'>Please check your internet connection</p>
        </div>

    </div>
  )
}

export default OfflinePage