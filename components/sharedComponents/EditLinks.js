'use client';

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/libs/utils";

const EditLinks = () => {
    const [existingUser, setExistingUser] = useState({});
    const [links, setLinks] = useState([]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const { user, isLoaded, isSignedIn } = useUser();
    const [popup, setPopup] = useState({ visible: false, message: '' });
    const[clear,setClear]= useState(false)
    const showPopup = (message, duration = 2000) => {
        setPopup({ visible: true, message });
        setTimeout(() => setPopup({ visible: false, message: '' }), duration);
    };

    useEffect(() => {
        const getUser = async () => {
            showPopup("Fetching user details...");
            if (user?.primaryEmailAddress?.emailAddress) {
                try {
                    const res = await fetch(`http://localhost:3000/api/users?email=${encodeURI(user.primaryEmailAddress.emailAddress)}`);
                    const data = await res.json();
                    setExistingUser(data);
                    setLinks(data?.links || []);
                    showPopup("User details fetched successfully!");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    showPopup("Failed to fetch user details.");
                }
            }
        };
        if (user && isLoaded && isSignedIn) {
            getUser();
        }
    }, []);

    const handleDelete = async (linkToDelete) => {
        showPopup("Deleting link...");
        
        // Remove the specific link from the UI without affecting others
        setLinks((prevLinks) => prevLinks.filter((link) => link.url !== linkToDelete.url));
        
        try {
            // Send delete request to the server
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.primaryEmailAddress?.emailAddress,
                    url: linkToDelete.url, // Make sure you are passing the correct URL
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete link: ${response.statusText}`);
            }
    
            showPopup("Link deleted successfully!");
        } catch (error) {
            console.error("Error deleting link:", error);
            showPopup("Failed to delete link.");
        }
    };
    

    const handleEdit = (linkToEdit) => {
        setTitle(linkToEdit.title);
        setUrl(linkToEdit.url);
        showPopup("Editing link...");
    };

    const handleAddLink = async (e) => {
        e.preventDefault();
        const newLink = { title, url };
        if((!title || !url) && !clear){
            showPopup('cannot update empty links')
            return 
        }
        

        showPopup("Updating links...");
        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.primaryEmailAddress?.emailAddress || "user@example.com",
                    links: [...links, newLink],
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add link: ${response.statusText}`);
            }

            setLinks((prevLinks) => [...prevLinks, newLink]);
            setTitle('');
            setUrl('');
            showPopup("Links updated successfully!");
        } catch (error) {
            console.error("Error adding link:", error);
            showPopup("Failed to update links.");
        }
    };

    return (
        <div
            style={{ scrollbarWidth: 'none' }}
            className="max-w-lg w-full h-[95%] overflow-y-scroll rounded-2xl p-4 shadow-input bg-white dark:bg-black"
        >
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Edit Links</h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Manage your personal links here.</p>

            <form className="my-8 " onSubmit={handleAddLink}>
                <LabelInputContainer>
                    <Label htmlFor="title">Link Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Enter link title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="url">Link URL</Label>
                    <Input
                        id="url"
                        name="url"
                        placeholder="Enter link URL"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </LabelInputContainer>

                <div className="flex px-2 md:px-8 gap-8">
                <button
                    className="bg-gradient-to-br relative mt-10 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Update Links &rarr;
                    <BottomGradient />
                </button>
                <button
                    className="bg-gradient-to-br relative mt-10 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    onClick={()=>{
                        setClear(true)
                        setLinks([])
                    }}
                >
                    Clear All  Links &rarr;
                    <BottomGradient />
                </button>

                </div>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
            <div className="my-8">
            {links.length === 0 ? (
    <p className="text-white">No links added yet.</p>
) : (
    links.map((link, index) => {
        if (link.title && link.url) {
            return (
                <div key={index} className="flex justify-between items-center mb-4">
                    <div>
                        <p className="font-medium text-neutral-800 dark:text-neutral-200">{link.title}</p>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400"
                        >
                            {link.url}
                        </a>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(link)}
                            className="text-yellow-500 hover:text-yellow-400"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(link)}
                            className="text-red-500 hover:text-red-400"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            );
        }
        return null;  // Ensure that when the link is invalid, it returns null (i.e., nothing rendered)
    })
)}

            </div>
            {popup.visible && <Popup message={popup.message} />}
        </div>
    );
};

export default EditLinks;

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

const Popup = ({ message }) => (
    <div className="fixed top-24 border-2  border-cyan-200 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg">
        
        {message}
        <BottomGradient/>
    </div>
);
