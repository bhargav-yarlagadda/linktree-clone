'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track which link is hovered
    const { user, isLoaded, isSignedIn } = useUser();

    return (
        <div>
            <div className="flex justify-between animate-slideIn items-center px-8 py-4 bg-black text-gray-800 rounded-t-md rounded-b-xl m-4 border border-gray-200">
                {/* Left Section */}

                {/* Center Section */}
                <div className="text-lg font-bold tracking-tight">
                    <span className="text-indigo-600">ConnectLy</span>
                </div>

                {/* Right Section */}
                <div className="relative flex gap-1 md:gap-6 text-sm font-medium">
                    {/* Shared Hover Background */}
                    <div
                        className={`absolute top-0 left-0 h-full w-[90px] bg-white rounded-md transition-all duration-300 ease-in-out ${hoveredIndex === null ? 'opacity-0' : 'opacity-100'
                            }`}
                        style={{
                            transform: `translateX(${hoveredIndex * 100}px)`,
                        }}
                    ></div>

                    {/* Conditional Render for User Links */}
                    {isLoaded && isSignedIn ? (
                        <div className="relative z-10 flex items-center gap-3 px-4 py-2 text-white hover:bg-white/80 hover:text-black duration-500 transition-all ease-in  rounded-md">
                            <span className="font-semibold">Welcome, {user?.fullName}</span>
                            <UserButton/>
                        </div>

                    ) : (
                        <>
                            {/* Sign-Up Link */}
                            <Link
                                href="/sign-up"
                                onMouseEnter={() => setHoveredIndex(0)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative z-10 px-4 py-2 rounded-md transition text-white duration-300 hover:text-black"
                            >
                                <span>Sign-up</span>
                            </Link>

                            {/* Sign In Link */}
                            <Link
                                href="/sign-in"
                                onMouseEnter={() => setHoveredIndex(1)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative z-10 px-4 py-2 rounded-md transition text-white duration-300 hover:text-black"
                            >
                                <span>Sign In</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
