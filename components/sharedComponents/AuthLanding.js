import React from "react";
import { Spotlight } from "../ui/Spotlight";

export function AuthLanding() {
  return (
    <div className="h-auto md:h-[40rem] w-full animate-fadeInUp rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:top-10" fill="white" />
      <div className=" p-4 max-w-7xl animate-fadeInUp  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Welcome to <br /> <strong>connectLy</strong>.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Get started by logging in to your account or signing up to create a new one. 
          Manage all your links in one place with ease. Let's make your online presence more connected.
        </p>
        <p className="mt-6 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          connectLy helps you consolidate your social profiles, websites, and other important links in one convenient place. 
          Simplify how others find and connect with you online.
        </p>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Ready to make the most of your online presence? Log in or sign up now to get started.
        </p>
      </div>
    </div>
  );
}
