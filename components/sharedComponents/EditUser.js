import React from 'react'
import EditLinks from './EditLinks'
import EditProfile from './EditProfile'

const EditUser = () => {
  return (
    <div className='w-full h-screen bg-gray-950  grid grid-cols-1 md:grid-cols-2'>
        <div className='col-span-1  h-full py-5 ps-5'>
        <EditProfile/>
        </div>
        <div className='col-span-1'>
        <EditLinks/>
        </div>
    </div>
  )
}

export default EditUser