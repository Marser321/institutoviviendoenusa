"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, HeartHandshake, RefreshCw } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Privacidad Total",
    description: "Tus datos están protegidos con encriptación de grado bancario (AES-256). Nunca compartimos tu información.",
  },
  {
    icon: Lock,
    title: "Seguridad 10DLC",
    description: "Cumplimos con todas las normativas federales de comunicación para asegurar que tu proceso sea 100% legal.",
  },
  {
    icon: HeartHandshake,
    title: "Compromiso de Ética",
    description: "No prometemos imposibles. Te damos una hoja de ruta honesta basada en hechos y leyes vigentes.",
  },
  {
    icon: RefreshCw,
    title: "Garantía de Paz Financiera",
    description: "Si aplicas nuestras estrategias y no ves un avance real en tu reporte en 90 días, trabajamos gratis hasta lograrlo.",
  },
];

export const GuaranteeSection = () => {
  return (
    <section className="relative py-24 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-12 md:p-20 relative overflow-hidden bg-brand-navy/5 border-brand-navy/10 rounded-[3rem]">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-green/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-brand-navy font-display font-bold text-3xl md:text-5xl mb-6 tracking-tight">
                Tu único riesgo real es <span className="text-brand-green italic">no hacer nada</span>.
              </h2>
              <p className="text-brand-navy/50 text-lg max-w-xl mx-auto font-medium">
                El costo de un mal crédito se paga todos los días. Nuestra garantía blinda tu decisión con resultados reales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {guarantees.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-[1.25rem] bg-brand-green/10 flex items-center justify-center shadow-inner">
                      <Icon className="w-8 h-8 text-brand-green" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-brand-navy font-display font-bold text-xl italic">{item.title}</h3>
                      <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
