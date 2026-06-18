"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Zap, Award, Battery } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/hero/slide1.jpg", alt: "SUR-RON off-road electric bike on rocky terrain" },
  { src: "/images/hero/slide2.jpg", alt: "SUR-RON electric dirt bike on trail" },
  { src: "/images/hero/slide3.jpg", alt: "SUR-RON electric bikes on mountain scenery" },
  { src: "/images/hero/slide4.jpg", alt: "SUR-RON electric dirt bikes by river" },
];

const stats = [
  { icon: Zap, label: "Max Power", value: "22,500W" },
  { icon: Battery, label: "Max Range", value: "150 km" },
  { icon: Award, label: "Models", value: "8 Bikes" },
];

const letterVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const letters = "SUR-RON".split("");

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="relative h-screen flex items-start md:items-center justify-center overflow-hidden pt-56 md:pt-60">

      {/* ── Background Image Slider ── */}
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              fill
              className="object-cover object-center"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlays for text legibility */}
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
      </motion.div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/[0.012] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/[0.012] blur-3xl pointer-events-none" />

      {/* ── Foreground Content ── */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 md:px-6 max-w-6xl mx-auto w-full">

        {/* Animated SUR-RON title */}
        <div className="flex justify-center items-baseline flex-wrap gap-1 md:gap-3 mb-6 overflow-hidden">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={`font-playfair font-bold leading-none text-white shimmer-text select-none ${
                l === "-"
                  ? "text-[clamp(2.5rem,8vw,6rem)]"
                  : "text-[clamp(3.5rem,13vw,10rem)]"
              }`}
            >
              {l}
            </motion.span>
          ))}
        </div>

        {/* Two-column text block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-stretch justify-center max-w-3xl mx-auto mb-10 md:mb-14 rounded-2xl overflow-hidden border border-white/[0.10]"
        >
          {/* Left: existing subtitle */}
          <div className="flex-1 px-7 py-6 flex items-center justify-center bg-white/[0.05] border-b sm:border-b-0 sm:border-r border-white/[0.10]">
            <p className="font-montserrat text-base md:text-lg font-bold text-white text-center leading-snug">
              Where raw electric power meets extraordinary design.{" "}
              Ride beyond limits.
            </p>
          </div>
          {/* Right: new tagline */}
          <div className="flex-1 px-7 py-6 flex flex-col items-center justify-center gap-2 bg-white/[0.02]">
            <h2 className="font-playfair text-xl md:text-2xl font-bold text-white text-center leading-snug">
              Ride Into The Future
            </h2>
            <p className="font-montserrat text-sm font-bold text-white/70 text-center leading-relaxed">
              Your premier destination for cutting-edge electric bikes that blend innovation, performance, and sustainability.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-20"
        >
          <motion.a
            href="#bikes"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-montserrat font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors duration-300 shadow-[0_0_24px_rgba(255,255,255,0.25)]"
          >
            Explore Bikes
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex justify-center gap-6 md:gap-12"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={16} className="text-white/40 mb-1" />
              <span className="font-playfair text-xl md:text-2xl font-bold text-white">{value}</span>
              <span className="font-montserrat text-xs md:text-sm font-semibold text-white/40 tracking-widest uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Slide Dot Indicators ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? "w-7 h-2 bg-white"
                : "w-2 h-2 bg-white/30 hover:bg-white/55"
            }`}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
      >
        <span className="font-montserrat text-[10px] text-white/28 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={15} className="text-white/28" />
        </motion.div>
      </motion.div>
    </div>
  );
}
