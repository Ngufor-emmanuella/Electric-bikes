"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  X, ShoppingCart, Check, Zap, Battery, Gauge, Shield, Weight, Clock,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import type { Bike } from "@/data/bikes";
import { useCart } from "@/context/CartContext";

type Props = {
  bike: Bike | null;
  onClose: () => void;
};

const specIcons: Record<string, React.ElementType> = {
  motor: Zap,
  battery: Battery,
  topSpeed: Gauge,
  range: Shield,
  weight: Weight,
  chargeTime: Clock,
};

function GalleryImage({
  src,
  alt,
  idx,
  direction,
}: {
  src: string;
  alt: string;
  idx: number;
  direction: number;
}) {
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`img-${idx}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain p-6 md:p-10"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            quality={95}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function BikeModal({ bike, onClose }: Props) {
  const { addItem } = useCart();
  const [activeColor, setActiveColor] = useState(0);
  const [direction, setDirection] = useState(1);
  const [added, setAdded] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbsMobileRef = useRef<HTMLDivElement>(null);

  const total = bike?.colors.length ?? 0;

  useEffect(() => {
    if (!bike) return;
    setActiveColor(0);
    setDirection(1);
    setAdded(false);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [bike]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, activeColor, total]);

  // Scroll desktop vertical strip to active thumb
  useEffect(() => {
    if (!thumbsRef.current) return;
    const active = thumbsRef.current.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeColor]);

  // Scroll mobile horizontal strip to active thumb
  useEffect(() => {
    if (!thumbsMobileRef.current) return;
    const active = thumbsMobileRef.current.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeColor]);

  const handleNext = () => {
    setDirection(1);
    setActiveColor((p) => (p + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveColor((p) => (p - 1 + total) % total);
  };

  const handleColorClick = (i: number) => {
    setDirection(i > activeColor ? 1 : -1);
    setActiveColor(i);
  };

  const handleAddToCart = () => {
    if (!bike) return;
    addItem(bike, bike.colors[activeColor]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {bike && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/88 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-6xl max-h-[93vh] bg-[#111111] rounded-3xl border border-gold/12 shadow-[0_0_60px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-30 w-10 h-10 md:w-9 md:h-9 rounded-full bg-black/70 md:bg-gold/10 hover:bg-white/10 border border-white/30 md:border-gold/20 flex items-center justify-center text-white md:text-gold/70 hover:text-white/60 transition-all duration-200 shadow-lg"
            >
              <X size={18} className="md:hidden" />
              <X size={16} className="hidden md:block" />
            </button>

            {/* ── Scrollable content wrapper ── */}
            <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">

              {/* ── LEFT: desktop thumb strip + main image ── */}
              <div className="md:w-[52%] flex flex-row overflow-hidden shrink-0">

                {/* Vertical thumbnail strip — desktop only */}
                <div
                  ref={thumbsRef}
                  className="hidden md:flex w-[72px] shrink-0 flex-col gap-2 p-2.5 overflow-y-auto bg-[#0d0d0d] border-r border-gold/[0.07]"
                  style={{ scrollbarWidth: "none" }}
                >
                  {bike.colors.map((color, i) => {
                    const isActive = activeColor === i;
                    return (
                      <motion.button
                        key={color.name}
                        data-active={isActive ? "true" : "false"}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleColorClick(i)}
                        className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none"
                        style={{
                          border: isActive
                            ? "2px solid rgba(255,255,255,0.85)"
                            : "2px solid transparent",
                          boxShadow: isActive ? "0 0 12px rgba(255,255,255,0.2)" : "none",
                        }}
                      >
                        <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(255,255,255,1) 0%, rgba(240,240,240,0.95) 55%, rgba(220,220,220,0.7) 80%, transparent 100%)",
                            }}
                          />
                          <Image
                            src={color.image}
                            alt={`${bike.name} — ${color.name}`}
                            fill
                            className="object-contain p-1.5"
                            sizes="72px"
                            quality={85}
                          />
                        </div>
                        <div
                          className="text-center py-1 px-0.5"
                          style={{
                            background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                          }}
                        >
                          <p
                            className="font-montserrat leading-tight"
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.04em",
                              color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {color.name}
                          </p>
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="thumb-dot-desktop"
                            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold shadow-sm"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Main gallery image */}
                <div className="flex-1 relative min-h-[300px] md:min-h-0 overflow-hidden">
                  <GalleryImage
                    src={bike.colors[activeColor].image}
                    alt={`${bike.name} — ${bike.colors[activeColor].name}`}
                    idx={activeColor}
                    direction={direction}
                  />

                  {/* Prev / Next arrows */}
                  {total > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 border border-white/15 hover:border-white/35 flex items-center justify-center text-white/70 hover:text-white/60 transition-all duration-200 backdrop-blur-sm"
                      >
                        <ChevronLeft size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 border border-white/15 hover:border-white/35 flex items-center justify-center text-white/70 hover:text-white/60 transition-all duration-200 backdrop-blur-sm"
                      >
                        <ChevronRight size={18} />
                      </motion.button>
                    </>
                  )}

                  {/* Dot indicators */}
                  {total > 1 && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                      {bike.colors.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleColorClick(i)}
                          className={`rounded-full transition-all duration-400 ${
                            i === activeColor
                              ? "w-5 h-1.5 bg-white"
                              : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Colour indicator bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center gap-2 bg-gradient-to-t from-black/40 to-transparent">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-gold/30 shrink-0"
                      style={{ backgroundColor: bike.colors[activeColor].hex }}
                    />
                    <span className="font-montserrat text-[11px] font-semibold text-white/70 tracking-wider">
                      {bike.colors[activeColor].name}
                    </span>
                    <span className="ml-auto font-montserrat text-[10px] text-white/30 tracking-widest uppercase">
                      {activeColor + 1} / {total}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Mobile horizontal thumbnail strip ── */}
              <div
                ref={thumbsMobileRef}
                className="flex md:hidden overflow-x-auto gap-2.5 px-3 py-3 bg-[#0d0d0d] border-y border-gold/[0.07] shrink-0"
                style={{ scrollbarWidth: "none" }}
              >
                {bike.colors.map((color, i) => {
                  const isActive = activeColor === i;
                  return (
                    <motion.button
                      key={color.name}
                      data-active={isActive ? "true" : "false"}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleColorClick(i)}
                      className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none"
                      style={{
                        width: "68px",
                        border: isActive
                          ? "2px solid rgba(255,255,255,0.85)"
                          : "2px solid rgba(255,255,255,0.12)",
                        boxShadow: isActive ? "0 0 12px rgba(255,255,255,0.2)" : "none",
                      }}
                    >
                      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(255,255,255,1) 0%, rgba(240,240,240,0.95) 55%, rgba(220,220,220,0.7) 80%, transparent 100%)",
                          }}
                        />
                        <Image
                          src={color.image}
                          alt={`${bike.name} — ${color.name}`}
                          fill
                          className="object-contain p-1.5"
                          sizes="68px"
                          quality={85}
                        />
                      </div>
                      <div
                        className="text-center py-1.5 px-1"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <p
                          className="font-montserrat leading-tight"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.04em",
                            color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                          }}
                        >
                          {color.name}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold shadow-sm" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* ── RIGHT PANEL: details ── */}
              <div className="md:w-[48%] flex flex-col md:overflow-y-auto md:border-l border-gold/[0.07]">
                <div className="p-6 md:p-8 flex flex-col gap-5 flex-1">

                  {/* Category + model */}
                  <div>
                    <span className="font-montserrat text-[10px] font-semibold tracking-[0.28em] uppercase text-gold/50">
                      {bike.category} · {bike.model}
                    </span>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mt-1.5 leading-tight">
                      {bike.name}
                    </h2>
                    <p className="font-montserrat text-sm text-white/40 italic mt-1">{bike.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pb-5 border-b border-gold/[0.08]">
                    <span className="font-montserrat text-xs text-gold/40 font-medium">USD</span>
                    <span className="font-playfair text-4xl font-bold text-gold">
                      ${bike.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Colour selector */}
                  <div>
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/45 mb-3">
                      Colour — {bike.colors[activeColor].name}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {bike.colors.map((c, i) => (
                        <motion.button
                          key={c.name}
                          title={c.name}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleColorClick(i)}
                          className="relative w-7 h-7 rounded-full transition-all duration-200 focus:outline-none"
                          style={{
                            backgroundColor: c.hex,
                            border: activeColor === i ? "2.5px solid #ffffff" : "2.5px solid rgba(255,255,255,0.10)",
                            boxShadow: activeColor === i ? "0 0 0 2px rgba(255,255,255,0.25)" : "none",
                          }}
                        >
                          {activeColor === i && (
                            <motion.div
                              layoutId="color-ring"
                              className="absolute -inset-1.5 rounded-full border border-gold/40"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-montserrat text-sm text-white/50 leading-[1.75]">
                    {bike.description}
                  </p>

                  {/* Specs */}
                  <div>
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/45 mb-3">
                      Specifications
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(bike.specs).slice(0, 6).map(([key, val]) => {
                        const Icon = specIcons[key] ?? Zap;
                        return (
                          <div
                            key={key}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-gold/[0.03] border border-gold/[0.07]"
                          >
                            <Icon size={12} className="text-gold/30 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-montserrat text-[8px] font-semibold tracking-widest uppercase text-gold/30 mb-0.5">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </p>
                              <p className="font-montserrat text-[11px] text-white/70 font-medium leading-snug">
                                {val}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Extended specs */}
                  {bike.extendedSpecs && bike.extendedSpecs.length > 0 && (
                    <div>
                      <p className="font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/45 mb-3">
                        Full Specifications
                      </p>
                      <div className="flex flex-col divide-y divide-gold/[0.06] rounded-xl overflow-hidden border border-gold/[0.08]">
                        {bike.extendedSpecs.map(({ label, value }) => (
                          <div key={label} className="flex gap-3 px-3.5 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-150">
                            <span className="font-montserrat text-[10px] font-bold tracking-widest uppercase text-gold/40 shrink-0 w-28 mt-0.5">
                              {label}
                            </span>
                            <span className="font-montserrat text-xs text-white/65 leading-relaxed">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/45 mb-3">
                      Key Features
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {bike.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/30 shrink-0" />
                          <span className="font-montserrat text-xs text-white/50 leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add to cart */}
                  <div className="pt-4 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                        added
                          ? "bg-gold/15 text-gold border border-gold/25"
                          : "bg-gold text-black hover:bg-gold-light shadow-[0_0_24px_rgba(255,255,255,0.25)]"
                      }`}
                    >
                      {added ? (
                        <><Check size={16} /> Added to Cart</>
                      ) : (
                        <><ShoppingCart size={16} /> Add to Cart — ${bike.price.toLocaleString()}</>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
