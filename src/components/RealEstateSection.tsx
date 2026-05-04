"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, CheckCircle2, ChevronRight, Home, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "¿Cuál es tu presupuesto?",
    options: ["Menos de $300k", "$300k - $500k", "$500k - $1M", "$1M+"],
  },
  {
    title: "¿En cuánto tiempo planeas comprar?",
    options: ["Inmediato", "1-3 meses", "3-6 meses", "Más de 6 meses"],
  },
  {
    title: "¿Sabes tu puntaje de crédito actual?",
    options: ["Menos de 600", "600 - 680", "680 - 720", "Más de 720"],
  },
];

export const RealEstateSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isQualified, setIsQualified] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsQualified(true);
    }
  };

  return (
    <section id="realestate" className="relative py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-brand-green text-sm font-bold uppercase tracking-[0.3em] mb-4"
            >
              Consultoría de Élite
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-navy font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.1]"
            >
              Invierte en <span className="text-brand-green">Real Estate</span> con la estrategia correcta.
            </motion.h2>
          </div>

          <p className="text-brand-navy/60 text-lg leading-relaxed font-medium">
            No es solo comprar una casa, es construir patrimonio. Vojmir te guía en el proceso de calificación y selección para asegurar que tu inversión sea rentable desde el día uno.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-brand-green" />
               </div>
               <div>
                  <p className="text-brand-navy font-bold">Optimización de Intereses</p>
                  <p className="text-brand-navy/40 text-sm">Ahorra miles de dólares con el score correcto.</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-brand-green" />
               </div>
               <div>
                  <p className="text-brand-navy font-bold">Estrategia Multi-propiedad</p>
                  <p className="text-brand-navy/40 text-sm">Cómo escalar tu portafolio en Estados Unidos.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Qualification / Calendar Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isQualified ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="glass-card p-10 border-brand-navy/10 shadow-2xl bg-brand-navy/5"
              >
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-brand-navy font-display font-bold text-2xl mb-1 italic">Pre-calificación</h3>
                    <p className="text-brand-navy/40 text-xs font-bold uppercase tracking-widest">Paso {currentStep + 1} de {steps.length}</p>
                  </div>
                  <Home className="w-8 h-8 text-brand-green" />
                </div>

                <div className="mb-12">
                   <p className="text-brand-navy font-bold text-xl mb-6">{steps[currentStep].title}</p>
                   <div className="grid grid-cols-1 gap-3">
                     {steps[currentStep].options.map((option) => (
                       <button
                         key={option}
                         onClick={handleNext}
                         className="w-full p-4 rounded-xl border border-brand-navy/10 bg-white hover:border-brand-green hover:bg-brand-green/5 text-left text-brand-navy font-bold transition-all flex items-center justify-between group"
                       >
                         {option}
                         <ChevronRight className="w-4 h-4 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                       </button>
                     ))}
                   </div>
                </div>

                <div className="w-full bg-brand-navy/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    className="h-full bg-brand-green"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 border-brand-navy/10 shadow-2xl bg-brand-navy text-white text-center"
              >
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-green/30">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-display font-bold text-3xl mb-4 italic">¡Estás Calificado!</h3>
                <p className="text-white/60 mb-10 text-lg leading-relaxed">
                  Basado en tus respuestas, eres un candidato ideal para una consultoría privada. Selecciona un horario en la agenda de Vojmir.
                </p>
                
                {/* Placeholder for Calendar Embed */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 mb-8 flex flex-col items-center justify-center gap-4">
                   <Calendar className="w-10 h-10 text-brand-green animate-pulse" />
                   <p className="text-white font-black uppercase tracking-widest text-xs">Cargando Agenda de Vojmir...</p>
                </div>

                <button className="text-brand-green font-bold text-sm uppercase tracking-widest hover:underline">
                  Ver disponibilidad completa
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
