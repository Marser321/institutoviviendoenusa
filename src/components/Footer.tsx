"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

// Lucide-style brand icons (v1.x removed them)
const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);


export const Footer = () => {
  return (
    <footer className="relative bg-white pt-24 pb-12 px-6 border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Logo variant="footer" />
            </Link>
            <p className="text-brand-navy/60 text-sm leading-relaxed font-medium">
              El instituto líder en educación financiera para la comunidad hispana en Estados Unidos. Tu libertad empieza con el conocimiento.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy hover:bg-brand-green hover:text-white transition-all">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy hover:bg-brand-green hover:text-white transition-all">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy hover:bg-brand-green hover:text-white transition-all">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-brand-navy font-display font-bold text-lg uppercase tracking-widest italic">Navegación</h4>
            <ul className="space-y-4">
              <li><Link href="#cursos" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Cursos Online</Link></li>
              <li><Link href="#comunidad" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Comunidad VIP</Link></li>
              <li><Link href="#presenciales" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Eventos Presenciales</Link></li>
              <li><Link href="#realestate" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Real Estate VIP</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-brand-navy font-display font-bold text-lg uppercase tracking-widest italic">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-brand-navy/60 text-sm font-medium">
                <Mail size={18} className="text-brand-green" />
                soporte@institutoviviendoenusa.com
              </li>
              <li className="flex items-center gap-3 text-brand-navy/60 text-sm font-medium">
                <Phone size={18} className="text-brand-green" />
                +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-3 text-brand-navy/60 text-sm font-medium">
                <MapPin size={18} className="text-brand-green" />
                Miami, Florida, USA
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-8">
            <h4 className="text-brand-navy font-display font-bold text-lg uppercase tracking-widest italic">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="text-brand-navy/60 hover:text-brand-green text-sm font-bold transition-colors">Descargo de Responsabilidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-navy/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-brand-navy/40 text-xs font-bold uppercase tracking-widest text-center md:text-left">
            © 2026 Instituto Viviendo en USA. Todos los derechos reservados.
          </p>
          <p className="text-brand-navy/20 text-[10px] font-black uppercase tracking-[0.3em]">
            Designed by AD Media Solution
          </p>
        </div>
      </div>
    </footer>
  );
};
