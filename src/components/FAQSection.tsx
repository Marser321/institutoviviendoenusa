"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿Es legal el proceso de reparación de crédito?",
    answer: "Absolutamente. Está respaldado por la Ley de Informes Justos de Crédito (FCRA). Tienes el derecho legal de disputar cualquier información inexacta, incompleta o no verificable en tu reporte.",
  },
  {
    question: "¿Cuánto tiempo toma ver resultados reales?",
    answer: "Aunque cada caso es único, la mayoría de nuestros alumnos y clientes ven cambios significativos en los primeros 45 a 90 días. La clave es la consistencia en las estrategias que enseñamos.",
  },
  {
    question: "¿Necesito tener Seguro Social (SSN) para participar?",
    answer: "No necesariamente. También trabajamos con personas que tienen ITIN. El sistema crediticio en USA permite construir historial con ambos documentos.",
  },
  {
    question: "¿Garantizan un puntaje específico (ej. 700+)?",
    answer: "Nadie puede garantizar un puntaje exacto legalmente. Lo que garantizamos es la aplicación de las leyes y estrategias que históricamente han llevado a miles de personas a superar los 700 puntos.",
  },
  {
    question: "¿Qué pasa si me vuelven a negar un crédito?",
    answer: "Te enseñamos a leer las cartas de rechazo. Muchas veces es un error administrativo o de dirección que se soluciona en minutos. Te damos el soporte para que sepas exactamente qué responder.",
  },
  {
    question: "¿La Comunidad VIP tiene permanencia obligatoria?",
    answer: "Para nada. Puedes cancelar tu suscripción de $49/mes en cualquier momento sin penalizaciones. Queremos que te quedes por el valor que recibes, no por un contrato.",
  },
  {
    question: "¿Cómo sé qué curso es el adecuado para mí?",
    answer: "Si quieres comprar una casa o auto a título personal, el Curso de Crédito Personal es tu base. Si buscas financiamiento para tu negocio sin arriesgar tu patrimonio personal, el Curso Comercial es el indicado.",
  },
  {
    question: "¿Vojmir realmente responde las dudas?",
    answer: "Sí. Vojmir participa activamente en el grupo de WhatsApp VIP y lidera las sesiones en vivo de los martes. Es mentoría real, no solo videos grabados.",
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
