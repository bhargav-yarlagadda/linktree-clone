import { AuthLanding } from '@/components/sharedComponents/AuthLanding'
import { SignIn } from '@clerk/nextjs'

export const metadata={
    title:"connectLy | Auth"
}
export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='col-span-1 md:col-span-2 '>
            <AuthLanding/>
        </div>
        <div className='flex p-2 md:p-0 items-center  justify-center md:justify-start'>
            <SignIn/>
        </div>

    </div>
)
}