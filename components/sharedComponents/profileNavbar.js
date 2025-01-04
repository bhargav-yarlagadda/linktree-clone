'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const ProfileNavbar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track which link is hovered
    const { user } = useUser(); // Use Clerk to get user data

    return (
        <div className="px-2">
            <div className="flex justify-between items-center max-w-3xl px-8 py-2 bg-black text-gray-800 rounded-full mx-auto m-4 border border-gray-200 animate-slideIn">
                {/* Left Section */}
                <div className="text-md md:text-lg font-bold tracking-tight">
                    {/* You can add any logo or left-aligned content here */}
                </div>

                {/* Right Section */}
                <div className="relative flex gap-1 md:gap-6 text-sm font-medium">
                    {/* Profile Link */}
                    <Link
                        href={`/user/${user?.username}`} // Correct dynamic link
                        onMouseEnter={() => setHoveredIndex(1)} // Hover for Profile Link
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative z-10 px-4 py-2 rounded-md transition-all ${hoveredIndex === 1 ? 'bg-white text-black' : 'text-white'} duration-300`}
                        style={{
                            transform: hoveredIndex === 1 ? 'translateX(10px)' : 'translateX(0)', // Slide effect on hover
                        }}
                    >
                        Profile
                    </Link>

                    {/* Analytics Link */}
                    <Link
                        href="/profile/analytics"
                        onMouseEnter={() => setHoveredIndex(2)} // Hover for Analytics Link
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative z-10 px-4 py-2 rounded-md transition-all ${hoveredIndex === 2 ? 'bg-white text-black' : 'text-white'} duration-300`}
                        style={{
                            transform: hoveredIndex === 2 ? 'translateX(10px)' : 'translateX(0)', // Slide effect on hover
                        }}
                    >
                        Analytics
                    </Link>

                    {/* User Button (Clerk) */}
                    {user ? (
                        <div className="text-white"> {/* Replace this with actual User Button if needed */}
                            {/* User Button */}
                        </div>
                    ) : (
                        <Link
                            href="/sign-in"
                            className="relative z-10 px-4 py-2 rounded-md transition-all text-white hover:text-black duration-300"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileNavbar;
