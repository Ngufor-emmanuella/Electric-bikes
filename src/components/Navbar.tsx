"use client";

import Link from "next/link";
import { ShoppingCart, Zap, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#bikes", label: "Bikes" },
    { href: "/browse", label: "See All Bikes" },
    { href: "/#about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 md:top-[1%] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/92 backdrop-blur-xl border-b border-gold/10 pt-3 pb-5"
          : "bg-transparent pt-10 md:pt-5 pb-8"
      }`}
    >
      {/* ── Premium Electric Motorcycles header ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8 md:mb-4 overflow-hidden"
          >
            <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-white/25 bg-white/[0.04]">
              <Zap size={11} className="text-gold fill-gold" />
              <span className="font-montserrat text-xs font-bold tracking-[0.22em] uppercase text-gold/85">
                Premium Electric Motorcycles
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logo · Links · Cart ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            <Zap size={16} className="text-black fill-black" />
          </div>
          <span className="font-playfair text-xl font-bold tracking-wide text-white">
            SUR-RON
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-16">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-montserrat text-sm font-medium tracking-widest uppercase transition-colors duration-300 relative group px-3 py-1 rounded-[5px] ${
                  active
                    ? "text-white border border-white/30"
                    : "text-white/60 hover:text-gold border border-transparent"
                }`}
              >
                {l.label}
                {!active && (
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 hover:border-gold/50 bg-gold/5 hover:bg-gold/10 transition-all duration-300"
            >
              <ShoppingCart size={16} className="text-gold/80 group-hover:text-gold" />
              <span className="text-sm font-montserrat font-medium text-white/80 group-hover:text-white">Cart</span>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>

          <button
            className="md:hidden text-white/60 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-7 flex flex-col gap-4">
              {links.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-montserrat text-sm font-medium tracking-widest uppercase transition-colors py-2 px-3 rounded-[5px] ${
                      active
                        ? "text-white border border-white/30"
                        : "text-white/60 hover:text-gold border border-transparent"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
