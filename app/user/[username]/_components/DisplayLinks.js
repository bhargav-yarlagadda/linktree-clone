import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const DisplayLinks = ({ user }) => {
  const fallbackMessage =
    "No links to display yet. Check back later for more ways to connect!";
  const links = user?.links || [];

  return (
    <motion.div
      className="max-w-full min-h-[400px] md:h-full rounded-2xl border-2 border-cyan-500 overflow-hidden bg-black shadow-lg text-white p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        Want to know more about me?
      </h2>

      {/* Links Section */}
      {links.length > 0 ? (
        <ul className="space-y-4">
          {links.map((link, index) => (
            <motion.li
              key={index}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-900 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link href={link.url} target="_blank" passHref>
                <div
                  className="flex items-center justify-between text-cyan-400 font-medium hover:text-white transition-all"
                  rel="noopener noreferrer"
                >
                  {/* Link Title */}
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{link.title}</span>
                    {/* Link URL */}
                    <span className="text-sm text-gray-400 mt-1">{link.url}</span>
                    {/* Link Description (optional) */}
                    {link.description && (
                      <span className="text-sm text-gray-500 mt-2">{link.description}</span>
                    )}
                  </div>

                  {/* External Link Icon */}
                  <FaExternalLinkAlt className="w-5 h-5 text-cyan-400 hover:text-white" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center mt-4">{fallbackMessage}</p>
      )}
    </motion.div>
  );
};

export default DisplayLinks;
