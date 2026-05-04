"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "María Fernández",
    location: "Orlando, FL",
    quote: "Logré refinanciar mi auto y ahorrar $350 mensuales en solo 4 meses. Este programa cambió mi vida financiera.",
    result: "+180 puntos",
    avatar: "MF",
  },
  {
    name: "Carlos Rodríguez",
    location: "Houston, TX",
    quote: "Pasé de ser invisible para los bancos a aprobar mi primera hipoteca. Mi familia tiene casa propia gracias a Vojmir.",
    result: "+210 puntos",
    avatar: "CR",
  },
  {
    name: "Ana Gutiérrez",
    location: "Miami, FL",
    quote: "La comunidad VIP es increíble. Cada martes aprendo algo nuevo. Mi score subió de 520 a 715 en 6 meses.",
    result: "+195 puntos",
    avatar: "AG",
  },
  {
    name: "Roberto Méndez",
    location: "Los Ángeles, CA",
    quote: "Abrí mi LLC con líneas de crédito comercial de más de $50K gracias al curso. Inversión que se pagó sola.",
    result: "$50K en líneas",
    avatar: "RM",
  },
  {
    name: "Lucía Pérez",
    location: "Chicago, IL",
    quote: "Llegué sin crédito desde México. En 8 meses ya tengo 3 tarjetas de crédito y un score de 690. ¡Increíble!",
    result: "De 0 a 690",
    avatar: "LP",
  },
  {
    name: "José Martínez",
    location: "Dallas, TX",
    quote: "Las plantillas de disputa funcionaron al primer intento. Me eliminaron 4 colecciones del reporte en 30 días.",
    result: "4 colecciones eliminadas",
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
            Testimonios Reales
          </span>
          <h2 className="text-brand-navy font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
            Historias de <span className="text-brand-green italic">Transformación</span>.
          </h2>
          <p className="text-brand-navy/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Cada número representa una familia hispana que recuperó su poder financiero. Estos son resultados verificados de nuestra comunidad.
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
