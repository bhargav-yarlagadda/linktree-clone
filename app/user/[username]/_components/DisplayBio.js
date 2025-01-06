import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
const DisplayBio = ({ user }) => {
    const fallbackBio =
        "Discover my world through this LinkTree! Connect with me, explore my projects, or just say hi. Let’s build something amazing together—one link at a time!";

    return (
        <motion.div
            className="max-w-[600px] h-full rounded-2xl border-2 border-cyan-500 overflow-hidden bg-gray-900 shadow-lg text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Background Image */}
            <div className="relative w-full h-[200px]">
                <Image
                    src={"/images/DefaultUserBg.jpeg"}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
            </div>

            {/* User Profile Image */}
            <div className="relative -mt-16 flex justify-center pl-6">
                <div className="w-28 h-28 rounded-full border-4 border-cyan-500 overflow-hidden">
                    <Image
                        src={"/images/UserPlaceHolder.png"}
                        alt="User Profile"
                        width={112}
                        height={112}
                        objectFit="contain"
                        className="rounded-full object-cover object-center w-28 h-28"
                    />
                </div>
            </div>

            {/* User Details */}
            <div className="p-6 text-left">
                {/* Greeting */}
                <p className="text-lg font-medium text-gray-200 mb-2">
                    Hi, I am{" "}
                    <span className="text-cyan-400 font-bold">
                        {user?.username || "John Doe"}
                    </span>!
                </p>

                {/* User Name */}
                <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                    {user?.username || "John Doe"}
                </h2>

                {/* User Bio */}
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                    {user?.bio || fallbackBio}
                </p>

                {/* Email */}
                {user?.email && (
                    <Link href={`mailto:${user?.email}`} passHref>
                        <motion.button
                            className="mt-4 px-4 py-2 text-sm font-semibold text-gray-900 bg-cyan-400 rounded-lg shadow-md hover:bg-cyan-500 hover:text-white transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Want to collab?
                        </motion.button>
                    </Link>

                )}
            </div>
        </motion.div>
    );
};

export default DisplayBio;
