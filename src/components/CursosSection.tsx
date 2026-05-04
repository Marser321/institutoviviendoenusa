"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "personal",
    name: "Maestría en Crédito Personal",
    price: 297,
    badge: null,
    description: "El manual definitivo para dominar tu FICO® y abrir puertas.",
    features: [
      "17 módulos tácticos paso a paso",
      "Leyes federales a tu favor (FCRA)",
      "Plantillas de disputa de alta tasa",
      "Estrategia de 0 a 700+ puntos",
      "Acceso permanente a actualizaciones",
    ],
    cta: "Iniciar Maestría",
    highlighted: false,
  },
  {
    id: "bundle",
    name: "Bundle Libertad Total",
    price: 497,
    badge: "Elección Inteligente",
    description: "Dominio total: Personal + Comercial. Tu imperio empieza aquí.",
    features: [
      "Todo el curso Personal (Master)",
      "Todo el curso Comercial (EIN)",
      "Ahorra $97 USD de inmediato",
      "Soporte Prioritario VIP 1-a-1",
      "Plantillas de fondeo comercial",
      "Acceso a mentorías grupales",
    ],
    cta: "Obtener Libertad Total",
    highlighted: true,
  },
  {
    id: "comercial",
    name: "Fondeo Comercial Estratégico",
    price: 297,
    badge: null,
    description: "Capitaliza tu negocio con el crédito del banco, no el tuyo.",
    features: [
      "Estructura legal de protección (LLC)",
      "Crédito comercial sin aval personal",
      "Ruta a líneas de $50k - $250k",
      "Dominio de D&B y Experian Biz",
      "Estrategias de fondeo bancario",
    ],
    cta: "Iniciar Fondeo",
    highlighted: false,
  },
];

export const CursosSection = () => {
  return (
    <section id="cursos" className="relative py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <TrendingUp className="w-8 h-8 text-brand-green" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-navy font-display font-bold text-4xl md:text-7xl mb-8 tracking-tight"
          >
            Invierte en tu <span className="text-brand-green italic">futuro financiero</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-navy/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Precios estratégicos diseñados para que el conocimiento sea tu activo más rentable.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-[2.5rem] p-10 transition-all duration-500",
                plan.highlighted
                  ? "bg-brand-navy text-white shadow-[0_40px_80px_-15px_rgba(16,20,49,0.3)] scale-[1.08] z-10 border-2 border-brand-green/30"
                  : "bg-brand-navy/5 border border-brand-navy/10 hover:bg-white hover:shadow-2xl hover:border-brand-green/20"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-brand-green text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-full shadow-lg shadow-brand-green/30 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-10">
                <h3 className={cn(
                  "font-display font-bold text-2xl mb-3",
                  plan.highlighted ? "text-white" : "text-brand-navy"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                  "text-sm leading-relaxed font-medium",
                  plan.highlighted ? "text-white/50" : "text-brand-navy/50"
                )}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    "text-2xl font-black",
                    plan.highlighted ? "text-brand-green" : "text-brand-navy/20"
                  )}>$</span>
                  <span className={cn(
                    "font-display font-black text-7xl tracking-tighter",
                    plan.highlighted ? "text-white" : "text-brand-navy"
                  )}>
                    {plan.price}
                  </span>
                </div>
                <div className={cn(
                  "inline-block mt-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]",
                  plan.highlighted ? "bg-white/10 text-white" : "bg-brand-navy/5 text-brand-navy/40"
                )}>
                  Pago Único · Acceso Permanente
                </div>
              </div>

              <ul className="flex flex-col gap-4 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 group">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      plan.highlighted ? "bg-brand-green/20" : "bg-brand-green/10"
                    )}>
                      <Check className="w-3.5 h-3.5 text-brand-green" />
                    </div>
                    <span className={cn(
                      "text-sm font-bold transition-colors",
                      plan.highlighted ? "text-white/80 group-hover:text-white" : "text-brand-navy/70 group-hover:text-brand-navy"
                    )}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 group uppercase tracking-[0.2em] shadow-xl",
                  plan.highlighted
                    ? "bg-brand-green text-white hover:bg-white hover:text-brand-navy hover:scale-[1.02] shadow-brand-green/20"
                    : "bg-brand-navy text-white hover:bg-brand-green hover:scale-[1.02]"
                )}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust signal below pricing */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-brand-navy/30 text-xs font-bold uppercase tracking-[0.3em]"
        >
          Transacción Segura · Garantía de 90 días · Stripe Partner
        </motion.p>
      </div>
    </section>
  );
};
