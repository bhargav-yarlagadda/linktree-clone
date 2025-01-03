import { AuthLanding } from '@/components/sharedComponents/AuthLanding'
import { SignIn } from '@clerk/nextjs'

export const metadata={
    title:"connectLy | Auth"
}
export default function Page() {
  return (
    <div className='grid grid-cols-1 bg-black min-h-screen md:grid-cols-2'>
        <div className='col-span-1 md:col-span-1 '>
            <AuthLanding/>
        </div>
        <div className='flex p-2 md:p-0 items-center   col-span-1  justify-center md:justify-start'>
            <SignIn/>
        </div>

    </div>
)
}