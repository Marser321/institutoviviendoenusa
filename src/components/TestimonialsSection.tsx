"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "María Fernández",
    location: "Orlando, FL",
    quote: "Creí que mi bancarrota me condenaba por 10 años. Aplicando la estrategia de reconstrucción, refinancié mi auto y hoy ahorro $350 mensuales.",
    result: "Objeción: Bancarrota",
    avatar: "MF",
  },
  {
    name: "Carlos Rodríguez",
    location: "Houston, TX",
    quote: "Los bancos me rechazaban por tener un negocio 'riesgoso'. Vojmir me enseñó a separar mi perfil personal del comercial. Hoy tengo mi hipoteca.",
    result: "Objeción: Trabajador Independiente",
    avatar: "CR",
  },
  {
    name: "Ana Gutiérrez",
    location: "Miami, FL",
    quote: "Estaba harta de 'agencias' que cobraban mes a mes sin resultados. IVEU me dio las herramientas para hacerlo yo misma y subir a 715 puntos.",
    result: "Objeción: ¿Es otra estafa?",
    avatar: "AG",
  },
  {
    name: "Roberto Méndez",
    location: "Los Ángeles, CA",
    quote: "Pensaba que necesitaba usar mis ahorros para mi negocio. Abrí mi LLC y obtuve $50K en crédito comercial al 0% de interés.",
    result: "Objeción: Falta de Capital",
    avatar: "RM",
  },
  {
    name: "Lucía Pérez",
    location: "Chicago, IL",
    quote: "Llegué a USA solo con ITIN y me decían que no podía tener tarjetas. En 8 meses logré un score de 690 siguiendo la ruta exacta.",
    result: "Objeción: No tengo SSN",
    avatar: "LP",
  },
  {
    name: "José Martínez",
    location: "Dallas, TX",
    quote: "Pensé que mis cuentas médicas en colección eran imborrables. Las plantillas FCRA de IVEU obligaron a los burós a eliminarlas en 30 días.",
    result: "Objeción: Cuentas en Colección",
    avatar: "JM",
  },
];

/* Duplicate for seamless marquee */
const marqueeItems = [...testimonials, ...testimonials];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-32 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block text-brand-green text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Testimonios Anti-Excusas
          </span>
          <h2 className="text-brand-navy font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
            Derribamos tus <span className="text-brand-green italic">objeciones</span> con resultados.
          </h2>
          <p className="text-brand-navy/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Ya hemos escuchado todas las razones por las que "tu caso es diferente". Mira cómo nuestra comunidad hispana superó exactamente tu misma situación.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full overflow-hidden mb-6">
        <div className="flex gap-6 animate-marquee">
          {marqueeItems.map((t, i) => (
            <div
              key={`row1-${i}`}
              className="glass-card p-8 min-w-[400px] max-w-[400px] flex flex-col gap-6 shrink-0 hover:border-brand-green/30 hover:bg-white hover:shadow-xl transition-all duration-500 bg-brand-navy/5 border-brand-navy/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-green/20">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-brand-navy font-bold text-base">{t.name}</p>
                  <p className="text-brand-navy/40 text-xs font-bold uppercase tracking-widest">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-brand-green fill-brand-green" />
                  ))}
                </div>
              </div>
              <p className="text-brand-navy/70 text-base leading-relaxed italic font-medium">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-navy/5">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <span className="text-brand-green text-sm font-black uppercase tracking-widest">{t.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-marquee-reverse">
          {[...marqueeItems].reverse().map((t, i) => (
            <div
              key={`row2-${i}`}
              className="glass-card p-8 min-w-[400px] max-w-[400px] flex flex-col gap-6 shrink-0 hover:border-brand-green/30 hover:bg-white hover:shadow-xl transition-all duration-500 bg-brand-navy/5 border-brand-navy/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-green/20">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-brand-navy font-bold text-base">{t.name}</p>
                  <p className="text-brand-navy/40 text-xs font-bold uppercase tracking-widest">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-brand-green fill-brand-green" />
                  ))}
                </div>
              </div>
              <p className="text-brand-navy/70 text-base leading-relaxed italic font-medium">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-navy/5">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <span className="text-brand-green text-sm font-black uppercase tracking-widest">{t.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
