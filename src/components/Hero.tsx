"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditMeter } from "@/components/CreditMeter";
import { ChevronRight, Sparkles, ShieldCheck, Mail, User, Phone } from "lucide-react";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-transparent">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text Content (Col 7) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-navy/5 border border-brand-navy/10 px-4 py-1.5 rounded-full self-center lg:self-start">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-brand-navy/80 text-xs font-black tracking-[0.2em] uppercase">Estrategia Financiera · IVEU</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-brand-navy font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight">
            Recupera tu <span className="relative inline-block text-brand-green italic">
              Paz Crediticia
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-2 left-0 h-3 bg-brand-green/20 -z-10" 
              />
            </span> y conquista USA.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-brand-navy/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            No dejes que un número limite tu futuro. Enseñamos a la comunidad hispana a dominar el sistema bancario para comprar casa, auto y capitalizar sus negocios.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brand-navy/10" />
               ))}
             </div>
             <p className="text-brand-navy/60 text-sm font-bold">
               <span className="text-brand-navy">726 familias</span> transformaron su crédito este mes
             </p>
          </motion.div>
        </motion.div>

        {/* Lead Capture Form (Col 5) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <div className="glass-card p-8 md:p-10 border-brand-navy/10 shadow-2xl bg-white/80 backdrop-blur-2xl relative overflow-hidden">
            {/* Form Header */}
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="text-brand-navy font-display font-bold text-2xl mb-2 italic tracking-tight">Auditoría Gratuita</h3>
              <p className="text-brand-navy/50 text-sm font-medium">Descubre qué está bloqueando tu puntaje FICO® y cómo solucionarlo hoy mismo.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                <input 
                  type="text" 
                  placeholder="Nombre completo" 
                  className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                <input 
                  type="email" 
                  placeholder="Correo electrónico principal" 
                  className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                <input 
                  type="tel" 
                  placeholder="WhatsApp (con código de área)" 
                  className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                />
              </div>
              
              <button className="w-full group relative bg-brand-green text-white py-5 rounded-xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-xl shadow-brand-green/20 uppercase tracking-[0.2em] mt-6">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Solicitar Auditoría Gratis
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
              <p className="text-[10px] text-brand-navy/30 text-center uppercase tracking-widest font-black mt-4">
                🔒 Tus datos están 100% protegidos por IVEU
              </p>
            </form>

            {/* Decorative background circle */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl" />
          </div>

          {/* Floating Credit Score Indicator */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-6 hidden md:block"
          >
            <div className="bg-brand-navy text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
               <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center font-black text-xs shadow-lg shadow-brand-green/30">720</div>
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-black tracking-widest text-brand-green">Meta Alcanzada</span>
                 <span className="text-xs font-bold">Familia Morales</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-8 bg-brand-navy z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Respaldo bancario institucional:</span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">CHASE</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">Bank of America</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">WELLS FARGO</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">TRUIST</span>
          </div>
        </div>
      </div>
    </section>
  );
};
