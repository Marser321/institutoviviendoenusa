"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, Car, CreditCard, TrendingUp, DollarSign } from "lucide-react";

export const BackgroundPatterns = () => {
  const { scrollYProgress } = useScroll();

  // Parallax transformations
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
      {/* 1. Grainy Noise Texture (Stronger for character) */}
      <div className="absolute inset-0 opacity-[0.8] bg-noise mix-blend-soft-light" />
      
      {/* 2. Technical Grid Pattern (More opaque and defined) */}
      <motion.div 
        style={{ y: yGrid }}
        className="absolute inset-0 opacity-[0.8] bg-grid-pattern" 
      />

      {/* 3. Floating Contextual Icons (Parallax) */}
      {/* House - Real Estate focus */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -800]), rotate: 10 }}
        className="absolute top-[15%] left-[5%] text-brand-navy/[0.05]"
      >
        <Home size={300} strokeWidth={0.5} />
      </motion.div>

      {/* Car - Auto Loans focus */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 600]), rotate: -15 }}
        className="absolute bottom-[20%] right-[5%] text-brand-green/[0.08]"
      >
        <Car size={350} strokeWidth={0.3} />
      </motion.div>

      {/* Credit Card - Credit focus */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -1200]), rotate: 5 }}
        className="absolute top-[50%] right-[10%] text-brand-navy/[0.04]"
      >
        <CreditCard size={400} strokeWidth={0.2} />
      </motion.div>

      {/* Growth Chart - Success focus */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
        className="absolute top-[70%] left-[15%] text-brand-green/[0.06]"
      >
        <TrendingUp size={250} strokeWidth={0.5} />
      </motion.div>

      {/* Dollar Sign - Capital focus */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]), rotate: 20 }}
        className="absolute top-[40%] left-[40%] text-brand-navy/[0.02]"
      >
        <DollarSign size={500} strokeWidth={0.1} />
      </motion.div>

      {/* 4. Large Aurora Glows (Stay subtle) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-5%] right-[-5%] w-[900px] h-[900px] bg-brand-green/10 blur-[150px] rounded-full"
      />
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] bg-brand-blue/10 blur-[150px] rounded-full"
      />
    </div>
  );
};
