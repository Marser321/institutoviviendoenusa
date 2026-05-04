"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, ChevronRight, Users, Sparkles, TrendingUp } from "lucide-react";

const events = [
  {
    city: "Miami",
    state: "Florida",
    date: "15 de Mayo, 2026",
    venue: "Hilton Downtown Luxury",
    status: "Últimos 12 Lugares",
    fill: 85,
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=2000",
  },
  {
    city: "Orlando",
    state: "Florida",
    date: "22 de Junio, 2026",
    venue: "Convention Center Elite",
    status: "Inscripciones Abiertas",
    fill: 45,
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?q=80&w=2000",
  },
  {
    city: "Houston",
    state: "Texas",
    date: "10 de Julio, 2026",
    venue: "Westin Oaks Corporate",
    status: "Preventa Activa",
    fill: 20,
    image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?q=80&w=2000",
  },
];

export const PresencialesSection = () => {
  return (
    <section id="presenciales" className="relative py-32 px-6 bg-brand-navy overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 mb-20 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span className="text-brand-green text-xs font-black uppercase tracking-[0.3em]">Experiencia CEO Inmersiva</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-display font-bold text-5xl md:text-8xl tracking-tight leading-[0.9] mb-8"
            >
              Tour <span className="text-brand-green italic">Presencial</span> <br /> 2026.
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-white/40 text-xl font-medium max-w-xl"
            >
              Entrenamiento de alto impacto para quienes buscan dominar el sistema financiero cara a cara con Vojmir Viadilo.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl"
          >
            <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/20">
               <Users className="w-7 h-7 text-white" />
            </div>
            <div>
               <p className="text-white font-display font-bold text-3xl italic leading-none mb-1">5,000+</p>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Alumnos Impactados</p>
            </div>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.city}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/10 hover:border-brand-green/50 transition-all duration-700 shadow-2xl"
            >
              {/* Background Image */}
              <Image 
                src={event.image}
                alt={event.city}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div className="flex items-start justify-between">
                  <div className="bg-brand-green text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-green/20">
                    {event.status}
                  </div>
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                    <MapPin className="w-5 h-5 text-brand-green" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-display font-bold text-5xl md:text-6xl italic leading-none mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      {event.city}
                    </h3>
                    <p className="text-brand-green font-black uppercase tracking-[0.3em] text-xs mb-4">{event.state}</p>
                    <p className="text-white/60 text-sm font-bold flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-brand-green" />
                       {event.date}
                    </p>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-end">
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Disponibilidad</span>
                        <span className="text-brand-green text-xs font-black">{event.fill}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${event.fill}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-brand-green shadow-[0_0_10px_rgba(136,176,75,0.8)]"
                        />
                     </div>
                  </div>

                  <button className="w-full group/btn relative bg-white hover:bg-brand-green text-brand-navy hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl overflow-hidden">
                    <span className="relative z-10">Asegurar mi Ticket</span>
                    <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-brand-green -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/5 pt-12"
        >
          <div className="flex items-center gap-3">
             <Ticket className="w-5 h-5 text-brand-green" />
             <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Entradas Digitales Wallet</p>
          </div>
          <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-3">
             <TrendingUp className="w-5 h-5 text-brand-green" />
             <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Networking de Alto Nivel</p>
          </div>
          <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group">
             <p className="text-white/40 group-hover:text-white text-sm font-bold uppercase tracking-widest underline decoration-brand-green decoration-2 underline-offset-8">Solicitar ciudad personalizada</p>
             <ChevronRight className="w-4 h-4 text-brand-green" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
