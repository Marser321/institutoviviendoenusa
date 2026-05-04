import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditMeter } from "@/components/CreditMeter";
import { ChevronRight, Sparkles, ShieldCheck, Mail, User, Phone, CheckCircle2, Loader2 } from "lucide-react";

export const Hero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de integración con GoHighLevel Webhook
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-transparent">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-green/10 blur-[120px] rounded-full" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text Content (Col 7) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-brand-navy/5 border border-brand-navy/10 px-4 py-1.5 rounded-full self-center lg:self-start">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-brand-navy/80 text-xs font-black tracking-[0.2em] uppercase">Estrategia Financiera · IVEU</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-brand-navy font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight">
            Deja de <span className="relative inline-block text-brand-green italic">
              rentar tu vida
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-2 left-0 h-3 bg-brand-green/20 -z-10" 
              />
            </span> en Estados Unidos.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-brand-navy/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            El sistema financiero tiene reglas claras. Quienes las ignoran, pagan sobreprecios. Quienes las dominan, compran casas, autos y capitalizan sus negocios. Te enseñamos a jugar para ganar.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-brand-navy/10" />
               ))}
             </div>
             <p className="text-brand-navy/60 text-sm font-bold">
               <span className="text-brand-navy">726 familias</span> transformaron su crédito este mes
             </p>
          </motion.div>
        </motion.div>

        {/* Lead Capture Form (Col 5) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <div className="glass-card p-8 md:p-10 border-brand-navy/10 shadow-2xl bg-white/80 backdrop-blur-2xl relative overflow-hidden">
            {/* Form Header */}
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="text-brand-navy font-display font-bold text-2xl mb-2 italic tracking-tight">Diagnóstico Estratégico</h3>
              <p className="text-brand-navy/50 text-sm font-medium">Descubre qué algoritmo frena tu FICO® y el mapa exacto para desbloquearlo.</p>
            </div>

            {/* Form Fields */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 relative z-10" 
                  onSubmit={handleSubmit}
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                    <input 
                      required
                      type="text" 
                      placeholder="Nombre completo" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                    <input 
                      required
                      type="email" 
                      placeholder="Correo electrónico principal" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30" />
                    <input 
                      required
                      type="tel" 
                      placeholder="WhatsApp (con código de área)" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-brand-navy/5 border border-brand-navy/10 rounded-xl py-4 pl-12 pr-4 text-brand-navy placeholder:text-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all font-medium"
                    />
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    className="w-full group relative bg-brand-green text-white py-5 rounded-xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-xl shadow-brand-green/20 uppercase tracking-[0.2em] mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          Desbloquear Mi Reporte
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </button>
                  <p className="text-[10px] text-brand-navy/30 text-center uppercase tracking-widest font-black mt-4">
                    🔒 Tus datos están 100% protegidos por IVEU
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mb-6 shadow-xl shadow-brand-green/20">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-brand-navy font-display font-bold text-3xl mb-4 italic">¡Solicitud Enviada!</h4>
                  <p className="text-brand-navy/60 font-medium leading-relaxed">
                    Hemos recibido tus datos correctamente. En breve un asesor se pondrá en contacto contigo vía WhatsApp para iniciar tu diagnóstico estratégico.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative background circle */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-green/5 rounded-full blur-3xl" />
          </div>

          {/* Floating Credit Score Indicator */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-6 hidden md:block"
          >
            <div className="bg-brand-navy text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
               <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center font-black text-xs shadow-lg shadow-brand-green/30">720</div>
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-black tracking-widest text-brand-green">Meta Alcanzada</span>
                 <span className="text-xs font-bold">Familia Morales</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-8 bg-brand-navy z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Respaldo bancario institucional:</span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">CHASE</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">Bank of America</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">WELLS FARGO</span>
            <span className="text-white font-display font-black text-xl italic opacity-80 tracking-tighter">TRUIST</span>
          </div>
        </div>
      </div>
    </section>
  );
};
