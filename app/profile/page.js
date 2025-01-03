'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Page = () => {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const userEmail = user?.primaryEmailAddress;

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
            return;
        }

        const checkUserProfile = async () => {
            if (userEmail) {
                try {
                    // Make sure the fetch request matches the static API route
                    const response = await fetch(`/api/users?email=${userEmail}`);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (data.error) {
                        router.push("/profile/new-user");
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        if (user) {
            checkUserProfile();
        }
    }, [user, userEmail, router]);

    return <div>page</div>;
};

export default Page;
