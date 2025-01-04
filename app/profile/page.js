"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/sharedComponents/Loading";
import ProfileNavbar from "@/components/sharedComponents/profileNavbar";
import EditUser from "@/components/sharedComponents/EditUser";

const Page = () => {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [loading,setLoading] = useState(false)
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
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        setLoading(false)
    };
    useEffect(() => {
        // Redirect if not loaded or not signed in
        if (!isLoaded) return;
        if (!isSignedIn) {
            router.push("/");
            return;
        }
        checkUserProfile();
    }, [isLoaded, isSignedIn, user, router]);

    if (!isLoaded || loading) {
        return <Loading />;
    }

    return (
    <div 
    style={{scrollbarWidth:'none'}}
    className="flex bg-gray-950 overflow-y-scroll max-w-screen min-h-screen flex-col">
        <ProfileNavbar/>
        <EditUser/>
    
    </div>);
};

export default Page;
