"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Video, BookOpen, FileText, Shield, Star, Sparkles } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Soporte WhatsApp 24/7",
    description: "Acceso directo a Vojmir y al equipo de expertos para resolver tus dudas en tiempo real.",
    span: "col-span-1",
  },
  {
    icon: Video,
    title: "Clases en Vivo Semanales",
    description: "Cada martes, sesiones grupales interactivas donde profundizamos en estrategias avanzadas de crédito.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: BookOpen,
    title: "Biblioteca de Recursos",
    description: "Guías actualizadas, plantillas de cartas y herramientas financieras exclusivas para miembros.",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: FileText,
    title: "Plantillas de Disputa",
    description: "Cartas de disputa listas para enviar a las bureaus de crédito, personalizadas por situación.",
    span: "col-span-1",
  },
  {
    icon: Shield,
    title: "Auditoría de Bienvenida",
    description: "15 minutos uno-a-uno con un experto para analizar tu reporte y crear tu plan de acción.",
    span: "col-span-1",
  },
  {
    icon: Star,
    title: "Comunidad Exclusiva",
    description: "Red de hispanos construyendo crédito juntos. Comparte victorias, aprende de experiencias reales.",
    span: "col-span-1",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export const ComunidadVIP = () => {
  return (
    <section id="comunidad" className="relative py-32 px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-green/10 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-brand-green text-xs font-bold uppercase tracking-[0.2em]">El Círculo Interno</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-brand-navy font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
            El sistema aísla a los desinformados. Blíndate en nuestra{" "}
            <span className="text-brand-green italic">Comunidad VIP</span>.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-brand-navy/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Deja de buscar respuestas dispersas en Google. Accede al cerebro operativo de IVEU, obtén soporte 24/7 y usa las plantillas que los burós no quieren que tengas.
          </motion.p>
        </motion.div>

          {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`${feature.span} glass-card p-10 group hover:border-brand-green/30 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-default border-brand-navy/10 bg-brand-navy/5`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                  <Icon className="w-7 h-7 text-brand-green group-hover:text-white" />
                </div>
                <h3 className="text-brand-navy font-display font-bold text-2xl mb-4 italic">{feature.title}</h3>
                <p className="text-brand-navy/60 text-base leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Value Proposition + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-brand-navy rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl shadow-brand-navy/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-brand-green text-sm font-bold uppercase tracking-[0.3em] mb-4">Costo de no saber: Incalculable</p>
            <div className="flex items-baseline gap-6 mb-4">
              <span className="text-white/30 line-through text-3xl font-display font-bold">$500/hora</span>
              <span className="text-brand-green font-display font-black text-7xl tracking-tighter">$49</span>
              <span className="text-white/40 text-2xl font-bold">/mes</span>
            </div>
            <p className="text-white/60 text-lg font-medium">Un estratega financiero en tu WhatsApp por $1.60 al día.</p>
          </div>
          
          <button className="relative z-10 bg-brand-green hover:bg-white hover:text-brand-navy text-white px-12 py-6 rounded-2xl font-black text-lg transition-all hover:scale-[1.05] active:scale-[0.95] shadow-xl shadow-brand-green/20 whitespace-nowrap uppercase tracking-widest">
            Asegurar Mi Cupo VIP
          </button>

          {/* Decorative elements inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        </motion.div>
      </div>
    </section>
  );
};
