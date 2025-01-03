import React from 'react'
import { LampDecorator } from '@/components/sharedComponents/LampDecorator'

export const metadata={
  title:'connectLy | Profile'
}

const page = () => {  
  return (
    <div className='flex  items-center h-screen w-screen'>
      <LampDecorator/>
    </div>
  )
}

export default page