import React from 'react';
import Link from 'next/link'; // Import the Link component from Next.js

// Importing FontAwesome icons (You can choose other icon sets)
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Landing = () => {
  return (

    <div className="w-[95vw] h-[100vh] md:h-[80vh] bg-black text-white mx-auto rounded-md animate-fadeInUp flex flex-col justify-center items-center px-6 py-8">
      {/* Flex container to display content and video side by side */}
      <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8">
        {/* Content Section */}
        <div className="flex flex-col justify-center items-center sm:w-1/2">
          {/* Header Section */}
          <div className="text-center mb-12 opacity-0 translate-y-10 animate-fadeInUp">
            <h1 className="text-5xl font-semibold tracking-wider leading-tight">
              Welcome to <strong>connectLy</strong>
            </h1>
            <p className="mt-4 text-xl">
              All your important links, in one place.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Instagram', icon: <FaInstagram size={24} />, href: '#instagram' },
              { name: 'GitHub', icon: <FaGithub size={24} />, href: '#github' },
              { name: 'LinkedIn', icon: <FaLinkedin size={24} />, href: '#linkedin' },
              { name: 'Twitter', icon: <FaTwitter size={24} />, href: '#twitter' },
            ].map((link, index) => (
              <Link key={index} href={link.href} passHref>
                <div
                  className="bg-gradient-to-r from-blue-500 w-[120px] flex flex-col items-center justify-center to-purple-500 text-white text-lg font-semibold py-6 px-8 rounded-lg text-center shadow-lg hover:scale-105 transition-all duration-300 transform opacity-0 translate-y-10 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className="mb-4">
                    {link.icon}
                  </div>
                  <h3>{link.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        <Link href='/' 
  className="inline-flex h-10 my-3 animate-shimmer items-center justify-center rounded-md border border-blue-600 bg-[linear-gradient(110deg,#1e3a8a,45%,#3b82f6,55%,#1e3a8a)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none "
>
Get Started
        </Link>
        </div>

        {/* Video Section */}
        <div className="hidden sm:block sm:w-1/2">
          <video
            src="/videos/landing.mp4"  // Path to your video in the public folder
            autoPlay
            loop
            muted
            controls={false}
            className="w-full h-[80%] md:h-auto animate-fadeInUp duration-500 rounded-md shadow-lg"
          />
        </div>
   
      </div>

      {/* Additional Text Below the Video */}

    </div>
    
  );
};

export default Landing;



        // Button code
        <button >
          Shimmer
        </button>
  
        // tailwind.config.js code
   
      