'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

const ProfileNavbar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track which link is hovered

    return (
        <div className='px-2'>
            <div className="flex justify-between animate-slideIn items-center max-w-3xl px-8 py-2 bg-black text-gray-800 rounded-full mx-auto m-4 border border-gray-200">
                {/* Left Section */}

                {/* Center Section */}
                <div className="text-md md:text-lg font-bold tracking-tight">
                    <span className="text-indigo-600">ConnectLy</span>
                </div>

                {/* Right Section */}
                <div className="relative flex gap-1 md:gap-6 text-sm font-medium">
                    {/* Shared Hover Background */}
                   

                    {/* Conditional Render for User Links */}
         
                            {/* Sign-Up Link */}
                            <Link
                                href="/profile/analytics"
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative z-10 px-4 py-2 rounded-md transition-all hover:bg-white  text-white duration-300 hover:text-black"
                            >
                                <span>analytics</span>
                            </Link>

                            {/* Sign In Link */}
                    
                    
                </div>
            </div>
        </div>
    );
};

export default ProfileNavbar;
