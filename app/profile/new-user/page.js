'use client'
import React, { useEffect, useState } from 'react'
import { LampDecorator } from '@/components/sharedComponents/LampDecorator'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Loading from '@/components/sharedComponents/Loading'
const page = () => { 
  const router = useRouter()
  const {user,isSignedIn,isLoaded} = useUser()
  const [loading,setLoading] = useState(false)
useEffect(() => {
    // Redirect if not loaded or not signed in
    if (!isLoaded) return;
    if (!isSignedIn) {
        router.push("/");
        return;
    }
    const checkUserProfile = async () => {
      try {
          // Ensure user is fully loaded
          setLoading(true)
          const userEmail = user?.primaryEmailAddress?.emailAddress; // Adjust based on Clerk's API structure
          if (!userEmail) return;
  
          const response = await fetch(`/api/users?email=${encodeURIComponent(userEmail)}`);
  
          if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          
          const data = await response.json();
  
          if (data?.error) {
              router.push("/profile/new-user");
          }
          setLoading(false)
      } catch (error) {
          console.error("Error fetching user:", error);
      }
  };
    checkUserProfile();
}, [isLoaded, isSignedIn, user, router]);
  useEffect(()=>{
    if(isLoaded && isSignedIn){
      router.push('/profile')
    }
  }
,[isLoaded,isSignedIn])
  if(!isLoaded || loading){
    return <Loading/>
  }


  return (
    <div className='flex  items-center h-screen w-screen'>
      <LampDecorator/>
    </div>
  )
}

export default page