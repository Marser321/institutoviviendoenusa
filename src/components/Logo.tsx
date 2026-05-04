"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export const Logo: React.FC<LogoProps> = ({ className, variant = "header" }) => {
  const isHeader = variant === "header";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      }}
      className={`relative group ${isHeader ? "w-48 h-14" : "w-48 h-12"} ${className}`}
    >
      {/* Animated Glow effect behind logo on hover */}
      <motion.div
        className="absolute inset-0 bg-brand-green/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative w-full h-full"
      >
        <Image
          src="/logo.svg"
          alt="Instituto Viviendo en USA"
          fill
          priority={isHeader}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
};
