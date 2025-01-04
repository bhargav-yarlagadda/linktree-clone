import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/libs/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { motion } from "framer-motion";

const EditProfile = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, message: "", type: "" });

  const { user } = useUser();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress; // Replace with dynamic email if needed
        const response = await fetch(`http://localhost:3000/api/users?email=${email}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setFetchedData(data); // Store data in the fetchedData state
        setFormData(data); // Optionally, set initial form data to fetched data
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePicture") {
      setProfilePicture(files[0]);
    } else if (name === "backgroundImage") {
      setBackgroundImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if username is taken
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      const isUsernameTaken = data.users.some(user => user.username === formData.username);

      if (isUsernameTaken) {
        setModalData({
          isOpen: true,
          message: "Username is already taken. Please choose a different one.",
          type: "error"
        });
      } else {
        // Proceed with profile update
        // Here you would add your API request for updating the user profile
        setModalData({
          isOpen: true,
          message: "Profile updated successfully!",
          type: "success"
        });
      }
    } catch (err) {
      setModalData({
        isOpen: true,
        message: "Unable to fetch data. Please try again later.",
        type: "error"
      });
    }
  };

  return (
    <div className="max-w-md w-full rounded-2xl p-4 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Edit Profile</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Update your details here.</p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Username */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Email */}
        <LabelInputContainer className="mb-4 cursor-not-allowed">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            className="pointer-events-none"
            placeholder="Enter your email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Bio */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            name="bio"
            placeholder="Tell us about yourself"
            type="text"
            value={formData.bio || ""}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Profile Picture */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={handleFileChange}
          />
        </LabelInputContainer>

        {/* Background Image */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="backgroundImage">Background Image</Label>
          <Input
            id="backgroundImage"
            name="backgroundImage"
            type="file"
            onChange={handleFileChange}
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Update Profile &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      {/* Modal Pop-up for success or error */}
      {modalData.isOpen && (
        <motion.div
          className="fixed inset-0 flex text-black items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto ${modalData.type === "error" ? "border-red-500" : "border-green-500"}`}
            initial={{ y: "-50vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-bold text-center">{modalData.message}</h2>
            <div className="mt-4 text-center">
              <button onClick={() => setModalData({ isOpen: false, message: "", type: "" })} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EditProfile;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
