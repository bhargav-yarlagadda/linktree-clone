"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import CreateUserForm from "./CreateUserForm";
 export function LampDecorator() {
  return (
    (<LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: -370 }}
        whileInView={{ opacity: 1, y: 250 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" w-full bg-gradient-to-br   py-4 bg-clip-text text-center  font-medium tracking-tight text-transparent ">
            <CreateUserForm/>
      </motion.div>
    </LampContainer>)
  );
}
