'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';  // Import Next.js Image component
import { useUser } from '@clerk/nextjs';
import { Spotlight } from '@/components/ui/Spotlight';
import Loading from '@/components/sharedComponents/Loading';
import { WavyBackground } from '@/components/ui/wavy-background';
import DisplayUser from '@/components/sharedComponents/DisplayUser';
import Landing from '@/components/sharedComponents/Landing';

export default function ProfilePage({ params }) {
  const resolvedParams = React.use(params); // Unwrap the promise
  const { username } = resolvedParams; // Access the resolved params
  const [user, setUser] = useState(null); // Store the fetched user
  const [error, setError] = useState(null); // Store error message (if any)
  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        // Fetch user details from the API
        const response = await fetch(`/api/user?username=${username}`);
        const data = await response.json();

        if (response.ok && data.status === true) {
          setUser(data.user); // Set user data
        } else {
          setError(data.message || 'User not found');
        }
      } catch (err) {
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    }

    if (username) {
      fetchUser();
    } else {
      setError('Username parameter is missing');
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
       <div 
       style={{scrollbarWidth:'none'}}
       className="h-screen overflow-y-scroll w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
             <Spotlight className="-top-40 left-0 md:left-60 md:top-10" fill="white" />
             <div className=" p-4 max-w-7xl animate-fadeInUp  mx-auto relative z-10  w-full pt-20 md:pt-0">
               <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                 Welcome to <br /> <strong>connectLy</strong>.
               </h1>
                <h1 className='text-center text-white text-2xl font-mono mt-9'>
                        the user you are searching for does not exists
                </h1>

             </div>
           </div>
    )
  }

  return (
   <div 
   style={{scrollbarWidth:'none'}}
   className='overflow-y-scroll'>
    
    <WavyBackground className="">
        <DisplayUser user={user} />
    </WavyBackground>

   </div>
  );

}
