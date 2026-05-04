"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿Es realmente legal borrar información negativa?",
    answer: "Absolutamente. La Ley FCRA te otorga el derecho de cuestionar cualquier dato inexacto o no verificable. Si los burós no pueden probar que la deuda es 100% legítima, están obligados a borrarla.",
  },
  {
    question: "¿Cuándo veré el cambio en mi poder de compra?",
    answer: "Los primeros resultados suelen aparecer en 45-90 días. No se trata solo de subir un número, sino de limpiar tu perfil para que los bancos dejen de verte como un riesgo.",
  },
  {
    question: "¿Puedo hacerlo si solo tengo ITIN?",
    answer: "Sí. El sistema financiero de USA no discrimina el tipo de documento, discrimina el comportamiento. Hemos ayudado a cientos de personas con ITIN a comprar su primera casa.",
  },
  {
    question: "¿Por qué Vojmir es diferente a una agencia?",
    answer: "Las agencias quieren cobrarte una mensualidad eterna. Vojmir te entrega 'las llaves del castillo' para que tú mismo domines el sistema y nunca vuelvas a depender de nadie.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6 bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle className="w-8 h-8 text-brand-green" />
          </motion.div>
          <h2 className="text-brand-navy font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
            Preguntas <span className="text-brand-green italic">Frecuentes</span>
          </h2>
          <p className="text-brand-navy/60 text-lg md:text-xl leading-relaxed font-medium">
            Todo lo que necesitas saber para dar el primer paso con confianza.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300 border bg-white",
                openIndex === i 
                  ? "border-brand-green/30 shadow-xl shadow-brand-green/5" 
                  : "border-brand-navy/10 hover:border-brand-green/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className={cn(
                  "text-lg font-bold transition-colors font-display italic",
                  openIndex === i ? "text-brand-navy" : "text-brand-navy/70"
                )}>
                  {faq.question}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-brand-green transition-transform duration-300",
                  openIndex === i ? "rotate-180" : "rotate-0"
                )} />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 text-brand-navy/60 text-base leading-relaxed border-t border-brand-navy/5 pt-6 font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
