"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, CheckCircle2, TrendingUp } from "lucide-react";

export const ExpertSection = () => {
  return (
    <section className="relative py-32 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative h-[600px] md:h-[800px] rounded-[3rem] overflow-hidden group shadow-2xl"
        >
          <Image
            src="/vojmir.png"
            alt="Vojmir Viadilo - Experto Financiero"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 glass p-8 rounded-3xl border-white/20">
            <p className="text-white font-display font-bold text-3xl mb-1 italic">Vojmir Viadilo</p>
            <p className="text-brand-green font-bold tracking-[0.2em] uppercase text-xs">Fundador & Estratega Principal</p>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col gap-10"
        >
          <div>
            <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-[0.3em] mb-4">
              Liderazgo con Propósito
            </span>
            <h2 className="text-brand-navy font-display font-bold text-4xl md:text-7xl mb-8 leading-[1.1] tracking-tight">
              Tu guía experto hacia la <span className="text-brand-green italic">Libertad Financiera</span>.
            </h2>
          </div>

          <div className="space-y-8 text-brand-navy/60 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              Como inmigrante, entiendo perfectamente los retos de construir una vida desde cero en Estados Unidos. El crédito no es solo un número; es la llave que abre las puertas de tu primera casa, tu primer negocio y el futuro de tu familia.
            </p>
            <p>
              He dedicado los últimos 15 años a simplificar el complejo sistema financiero americano para nuestra comunidad. Mi misión es que ningún hispano se sienta excluido de las oportunidades por falta de conocimiento o un reporte de crédito desfavorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                 <TrendingUp className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-brand-navy font-display font-bold text-2xl tracking-tighter">+15 Años</p>
                <p className="text-brand-navy/40 text-[10px] uppercase font-bold tracking-widest">Trayectoria</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                 <CheckCircle2 className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-brand-navy font-display font-bold text-2xl tracking-tighter">30,000+</p>
                <p className="text-brand-navy/40 text-[10px] uppercase font-bold tracking-widest">Familias IVEU</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                 <Award className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-brand-navy font-display font-bold text-2xl tracking-tighter">MBA USA</p>
                <p className="text-brand-navy/40 text-[10px] uppercase font-bold tracking-widest">Estratega</p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-brand-navy/5">
            <blockquote className="italic text-brand-navy/80 text-2xl font-medium border-l-4 border-brand-green pl-8 leading-relaxed">
              "Mi éxito se mide por cuántas familias logran la paz crediticia y compran su primer hogar en este gran país."
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
