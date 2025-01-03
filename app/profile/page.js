'use client'
import { useEffect } from "react"
import { getUserByEmail } from "@/utils"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const { user, isLoaded, isSignedIn } = useUser()

    const userEmail = user?.primaryEmailAddress
    if(isLoaded && !isSignedIn){
        router.push('/')
    }
    useEffect(() => {
        const checkUserProfile = async () => {
            if (userEmail) {
                // Ensure getUserByEmail is awaited and handles async properly
                const data = await getUserByEmail(userEmail)

                // Assuming `data.err` is the error check. Adjust if necessary.
                if (data.error) {
                    router.push('/profile/new-user')  // Use `/` at the start for correct routing
                }
            }
        }

        if (user) {
            checkUserProfile()
        }
    }, [user, userEmail, router])

    return <div>page</div>
}

export default Page
