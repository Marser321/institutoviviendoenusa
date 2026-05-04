"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, MoveHorizontal } from "lucide-react";

export const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="relative py-32 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-6"
          >
            Metodología RPIV
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-brand-navy font-display font-bold text-5xl md:text-7xl mb-8 tracking-tight leading-[1.1]"
          >
            ¿Cansado de que te digan <span className="text-red-500 italic relative">
              "NO"
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-red-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-brand-navy/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Mira cómo cambia tu realidad financiera al pasar de un crédito restringido a uno excelente. <span className="text-brand-navy font-bold">La libertad es una elección estratégica.</span>
          </motion.p>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[600px] md:h-[850px] w-full rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(16,20,49,0.25)] border border-brand-navy/5 select-none cursor-ew-resize group"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Background: Success (Paz Crediticia) */}
          <div className="absolute inset-0 z-0 bg-white">
            <Image 
              src="/paz_financiera.png" 
              alt="Paz Financiera" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Soft Glow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center justify-start p-8 md:p-32 z-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl text-left"
            >
              <div className="w-24 h-24 bg-brand-green rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-brand-green/40 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-brand-navy font-display font-bold text-6xl md:text-9xl mb-10 uppercase italic tracking-tighter leading-[0.9] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                Paz <br /> <span className="text-brand-green">Crediticia</span>
              </h3>
              <ul className="space-y-6 text-brand-navy text-xl md:text-3xl font-black leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                <li className="flex items-center gap-4">
                   <span className="w-2 h-2 rounded-full bg-brand-green" />
                   Hipoteca con tasas mínimas
                </li>
                <li className="flex items-center gap-4">
                   <span className="w-2 h-2 rounded-full bg-brand-green" />
                   Ahorro de $100k+ en tu hogar
                </li>
                <li className="flex items-center gap-4">
                   <span className="w-2 h-2 rounded-full bg-brand-green" />
                   El auto que tu familia merece
                </li>
                <li className="flex items-center gap-4">
                   <span className="w-2 h-2 rounded-full bg-brand-green" />
                   Capital ilimitado para negocios
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Over: Pain (Crédito Roto) */}
          <div 
            className="absolute inset-0 z-20 transition-none overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            {/* Background Image for Pain */}
            <div className="absolute inset-0 bg-brand-navy">
              <Image 
                src="/credito_roto.png" 
                alt="Crédito Roto" 
                fill 
                className="object-cover opacity-95 grayscale-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-brand-navy/30 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 flex items-center justify-end p-8 md:p-32 pointer-events-none">
              <div className="max-w-2xl text-right">
                <div className="w-24 h-24 bg-red-500 rounded-3xl flex items-center justify-center ml-auto mb-10 shadow-2xl shadow-red-500/40 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-white font-display font-bold text-6xl md:text-9xl mb-10 uppercase italic tracking-tighter leading-[0.9] drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                  Crédito <br /> <span className="text-red-500">Roto</span>
                </h3>
                <ul className="space-y-6 text-white text-xl md:text-3xl font-black leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  <li className="flex items-center justify-end gap-4">
                    Renta rechazada o depósitos
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </li>
                  <li className="flex items-center justify-end gap-4">
                    Intereses de hasta 24%
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </li>
                  <li className="flex items-center justify-end gap-4">
                    Miedo a que revisen tu score
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </li>
                  <li className="flex items-center justify-end gap-4">
                    Sin opciones ante emergencias
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/40 z-40 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 bg-brand-green blur-sm opacity-50" />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center text-brand-green ring-[12px] ring-brand-green/20 cursor-grab active:cursor-grabbing pointer-events-auto"
            >
              <MoveHorizontal className="w-8 h-8" />
            </motion.div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-12 left-12 z-50 pointer-events-none">
            <span className="bg-brand-green/90 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl backdrop-blur-xl border border-white/30">
              Paz Financiera
            </span>
          </div>
          <div className="absolute bottom-12 right-12 z-50 pointer-events-none">
            <span className="bg-brand-navy/80 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl backdrop-blur-xl border border-white/10">
              Estado Actual
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
