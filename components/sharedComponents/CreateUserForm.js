import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
export default function CreateUserForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    email: "  ", // Ensure email is always a string
    bio: "",
  });
  const validateEmail=()=>{
    return user?.primaryEmailAddress?.emailAddress === formData.email.toLowerCase()
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.username.includes(" ")) {
      setModalMessage("Username cannot contain undescores.");
      setIsModalOpen(true);
      return;
    }
    // Validate username
    if (!formData.username.trim()) {
      setModalMessage("Username cannot be empty.");
      setIsModalOpen(true);
      return;
    }
    if(!validateEmail()){
      setModalMessage("please provide the same email through which you signed up");
      setIsModalOpen(true);
      return;
    }
  
    console.log("Form submitted", formData);
  
    try {
      // Check if username or email already exists by making a GET request to the server
      const response = await fetch("/api/users");
      const data = await response.json();
  
      if (response.ok) {
        const existingUser = data.users.find(
          (user) =>
            user.username === formData.username || user.email === formData.email
        );
  
        // If username or email is already taken
        if (existingUser) {
          setModalMessage("Username or email is already taken. Please choose another.");
          setIsModalOpen(true);
        } else {
          // Proceed with creating a new user via POST request
          const createResponse = await fetch("/api/users", {
            method: "POST", // Use POST to insert the new user
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Send the form data as the request body
          });
  
          const createResult = await createResponse.json();
  
          if (createResponse.ok) {
            setModalMessage("User successfully created!");
            setIsModalOpen(true);
            // Wait for the modal message to appear, then redirect
            setTimeout(() => {
              router.push("/profile"); // Redirect to profile page
            }, 2000); // Adjust the delay as needed (2 seconds here)
          } else {
            setModalMessage("Failed to create user. Please try again.");
            setIsModalOpen(true);
          }
        }
      } else {
        setModalMessage("Failed to fetch users. Please try again.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalMessage("Error occurred while fetching users. Please try again.");
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto w-full max-h-[500px] rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to connectLy
        <div className="">
        {}
        </div>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Just Few more steps to go!!!
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="John Doe"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="John Doe"
            type="email"
            value={formData.email} // Ensuring it's always defined
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
            value={formData.bio}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex text-black items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
            initial={{ y: "-50vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-bold text-center">{modalMessage}</h2>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

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
