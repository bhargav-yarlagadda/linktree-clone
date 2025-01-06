import React from 'react'
import { TypewriterEffectSmooth } from '../ui/typewriter-effect'
import DisplayBio from '@/app/user/[username]/_components/DisplayBio'
import DisplayLinks from '@/app/user/[username]/_components/DisplayLinks'



const DisplayUser = ({ user }) => {
    
    const words = [
        {
            text: "Welcome ",
            className: "leading-0 tracking-tighter me-2",

        },
        {
            text: "to ",
            className: "me-2",

        },
        {
            text: "My ",
            className: "me-2",

        },

        {
            text: "Profile.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div 
        
        className='w-full flex flex-col items-center'>
            <TypewriterEffectSmooth className={""} words={words} />
            <div className='w-screen grid gap-2 grid-cols-1 mt-5 md:grid-cols-3'>
                <div className='col-span-1 px-20 py-4 md:px-12 w-full h-full'>
                        <DisplayBio user={user} />
                </div>
                <div 
                style={{scrollbarWidth:'none'}}
                className='col-span-1 overflow-y-scroll w-full px-20 py-4 md:px-12  h-full md:col-span-2'>
                        <DisplayLinks user={user}/>
                </div>  
            </div>
        </div>
    )
}

export default DisplayUser
