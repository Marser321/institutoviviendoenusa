"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden bg-transparent">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-green/5 blur-[120px] rounded-full animate-aurora opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-blue/5 blur-[120px] rounded-full animate-aurora-delayed opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-brand-navy rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(16,20,49,0.4)]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-[0.4em] mb-8">
              Tu nueva historia empieza hoy
            </span>
            <h2 className="text-white font-display font-bold text-5xl md:text-8xl mb-10 leading-[1.05] tracking-tight">
              ¿Listo para tomar el control de tu <span className="text-brand-green italic">destino</span>?
            </h2>
            <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
              No dejes que un reporte de crédito dicte lo que puedes o no puedes lograr. Solicita tu auditoría gratuita y descubre el camino exacto hacia tu libertad financiera.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="group relative bg-brand-green text-white px-12 py-6 rounded-2xl font-black text-xl transition-all hover:scale-[1.05] active:scale-[0.95] overflow-hidden shadow-2xl shadow-brand-green/30 w-full sm:w-auto uppercase tracking-widest">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Iniciar Auditoría Gratis
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
              
              <button className="text-white/40 hover:text-white font-black text-sm flex items-center gap-3 group transition-all uppercase tracking-[0.2em]">
                Hablar con un asesor
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-brand-green" />
              </button>
            </div>

            <div className="mt-20 flex flex-wrap items-center justify-center gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
               <span className="text-white font-bold text-xs uppercase tracking-widest">PCI Compliant</span>
               <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
               <span className="text-white font-bold text-xs uppercase tracking-widest">SSL Secured</span>
               <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
               <span className="text-white font-bold text-xs uppercase tracking-widest">A2P Verified</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
