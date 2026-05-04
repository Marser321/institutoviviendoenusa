"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Comunidad", href: "#comunidad" },
  { name: "Cursos", href: "#cursos" },
  { name: "Presenciales", href: "#presenciales" },
  { name: "Real Estate", href: "#realestate" },
  { name: "FAQ", href: "#faq" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-brand-navy/5 py-3 shadow-sm" : "bg-white/50 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo variant="header" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brand-navy/60 hover:text-brand-green text-xs font-black transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="#auditoria"
            className="bg-brand-navy hover:bg-brand-green text-white px-8 py-3 rounded-xl text-xs font-black transition-all hover:shadow-xl hover:shadow-brand-green/20 flex items-center gap-2 group uppercase tracking-[0.2em]"
          >
            Iniciar Auditoría
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-brand-navy p-2 bg-brand-navy/5 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-navy/5 p-8 flex flex-col gap-6 lg:hidden shadow-2xl rounded-b-[2rem]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-navy font-display font-bold text-2xl italic flex items-center justify-between group"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
                <ChevronRight className="w-6 h-6 text-brand-green opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            ))}
            <Link
              href="#auditoria"
              className="bg-brand-navy text-white px-6 py-5 rounded-2xl text-center font-black uppercase tracking-[0.2em] text-sm mt-4 shadow-xl shadow-brand-navy/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Obtener Auditoría Gratis
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
