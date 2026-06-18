"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  ShoppingCart,
  ChevronRight,
  RotateCcw,
  Lock,
  Shield,
  Truck,
  Star,
  CheckCircle,
} from "lucide-react";
import { bikes } from "@/data/bikes";
import type { Bike } from "@/data/bikes";
import { useCart } from "@/context/CartContext";
import BikeModal from "./BikeModal";

type FeaturedConfig = {
  bikeId: string;
  tagline: string;
  flip: boolean;
  stats: { value: string; label: string }[];
  images?: string[];
  price?: string;
  prices?: { label: string; value: string }[];
};

const FEATURED: FeaturedConfig[] = [
  {
    bikeId: "storm-bee",
    tagline: "Violent as a Storm, Rides Freely & Smoothly",
    flip: false,
    price: "$6,499 USD",
    images: [
      "/images/bikes/light-bee-s/storm-bee1.jpg",
      "/images/bikes/light-bee-s/storm-bee5.jpg",
      "/images/bikes/light-bee-s/storm-bee6.webp",
      "/images/bikes/light-bee-s/storm-bee3.jpg",
    ],
    stats: [
      { value: "22.5kW", label: "Peak Power Output" },
      { value: "3.6s", label: "0–80 km/h Acceleration" },
      { value: "520N·m", label: "Wheel Torque" },
      { value: "SRTC", label: "Electronic Control" },
      { value: "74V 55Ah", label: "High-Rate Battery" },
      { value: "95 kg", label: "Optimised Weight" },
    ],
  },
  {
    bikeId: "light-bee-s",
    tagline: "A Huge Step for Small",
    flip: true,
    images: [
      "/images/bikes/light-bee-s/light-bee3.webp",
      "/images/bikes/light-bee-s/redefine2.jpg",
    ],
    prices: [
      { label: "Standard", value: "$4,350 USD" },
      { label: "Premium", value: "$4,600 USD" },
    ],
    stats: [
      { value: "6kW", label: "Max Power" },
      { value: "45mph", label: "Top Speed" },
      { value: "162ft·lb", label: "High Torque" },
      { value: "65 miles", label: "Max Range" },
      { value: "60V 32Ah", label: "High-Performance Battery" },
      { value: "49 kg", label: "Light Body" },
    ],
  },
];

const REVIEWS = [
  {
    name: "Google Reviews",
    score: "4.9",
    count: "2,400+ verified reviews",
    badge: "VERIFIED",
    badgeClass: "bg-blue-500/15 text-blue-300 border border-blue-500/20",
    accentHex: "#4285F4",
    stars: true,
  },
  {
    name: "Trustpilot",
    score: "4.8",
    count: "1,800+ verified reviews",
    badge: "VERIFIED",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    accentHex: "#00B67A",
    stars: true,
  },
  {
    name: "BBB Rating",
    score: "A+",
    count: "Accredited since 2024",
    badge: "CERTIFIED",
    badgeClass: "bg-sky-500/15 text-sky-300 border border-sky-500/20",
    accentHex: "#0059A6",
    stars: false,
  },
];

const TRUST_STATS = [
  { value: "50k+", label: "Orders Shipped", sub: "Delivered worldwide" },
  { value: "SSL", label: "Secure Checkout", sub: "256-bit encryption" },
  { value: "98%", label: "Satisfaction Rate", sub: "Happy customers" },
];

const TRUST_BADGES = [
  { Icon: RotateCcw, title: "30-day returns", sub: "No questions asked" },
  { Icon: Lock, title: "Private & secure", sub: "Your data is never sold" },
  { Icon: Shield, title: "Buyer protection", sub: "100% purchase guarantee" },
  { Icon: Truck, title: "Fast shipping", sub: "1–5 business days" },
];

function FeaturedSlide({
  config,
  onViewBike,
}: {
  config: FeaturedConfig;
  onViewBike: (b: Bike) => void;
}) {
  const { addItem } = useCart();
  const bike = bikes.find((b) => b.id === config.bikeId)!;
  const [addedFlash, setAddedFlash] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  const slides = config.images ?? [bike.colors[0].image];
  const hasSlider = slides.length > 1;

  const next = useCallback(
    () => setSlideIdx((p) => (p + 1) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!hasSlider) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [hasSlider, next]);

  const handleOrder = () => {
    addItem(bike, bike.colors[0]);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1600);
  };

  const isFlipped = config.flip;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden border-b border-white/[0.06]">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial accent */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${isFlipped ? "right-1/4" : "left-1/4"} w-96 h-96 rounded-full pointer-events-none`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
        }}
      />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-10 ${
          isFlipped ? "md:flex-row-reverse" : "md:flex-row"
        } items-center md:gap-16`}
      >
        {/* ── Bike Image / Slider ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: isFlipped ? -50 : 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:w-[52%] w-full shrink-0"
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.07)]"
            style={{ aspectRatio: "4/3" }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[slideIdx]}
                  alt={`${bike.name} view ${slideIdx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 52vw"
                  priority={slideIdx === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            {hasSlider && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`rounded-full transition-all duration-400 ${
                      i === slideIdx
                        ? "w-6 h-2 bg-white"
                        : "w-2 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div className="md:w-[48%] flex flex-col gap-7">
          {/* Brand + title + price */}
          <motion.div
            initial={{ opacity: 0, x: isFlipped ? 70 : -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-montserrat text-sm font-bold tracking-[0.3em] uppercase text-white/35 block mb-3">
              SURRON E-BIKES
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-3">
              {bike.name}
            </h2>
            <p className="font-montserrat text-lg text-white/75 leading-relaxed mb-3">
              {config.tagline}
            </p>
            {config.price && (
              <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.12]">
                <span className="font-playfair text-2xl font-bold text-white">
                  {config.price}
                </span>
                <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-white/45">
                  Starting price
                </span>
              </div>
            )}
            {config.prices && config.prices.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {config.prices.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="flex flex-col gap-1 px-5 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:border-white/25 transition-colors duration-200"
                  >
                    <span className="font-montserrat text-[10px] font-bold tracking-[0.22em] uppercase text-white/40">
                      {label}
                    </span>
                    <span className="font-playfair text-2xl font-bold text-white leading-none">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex gap-3 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOrder}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-full font-montserrat font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
                addedFlash
                  ? "bg-white/15 text-white border border-white/25"
                  : "bg-white text-black hover:bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.12)]"
              }`}
            >
              {addedFlash ? <><CheckCircle size={13} />Added!</> : <><ShoppingCart size={13} />Order Now</>}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onViewBike(bike)}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/45 text-white font-montserrat font-bold text-xs tracking-widest uppercase transition-all duration-300"
            >
              <ChevronRight size={13} />
              More Info
            </motion.button>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {config.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.07 }}
                className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/20 hover:border-white/40 shadow-[0_0_14px_rgba(255,255,255,0.07)] transition-colors duration-200"
              >
                <span className="font-montserrat text-base md:text-lg font-bold text-white leading-none">
                  {stat.value}
                </span>
                <span className="font-montserrat text-xs font-bold text-white/40 leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BikeShowcase() {
  const [modalBike, setModalBike] = useState<Bike | null>(null);

  return (
    <div className="bg-[#080808]">

      {/* ─── Trust & Social Proof (moved above bike slides) ─── */}
      <section className="pt-24 pb-10 px-6 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="flex flex-col md:flex-row md:items-end gap-6 mb-14"
          >
            <div className="flex-1">
              <span className="font-montserrat text-sm font-bold tracking-[0.28em] uppercase text-white/55 flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-white/35" />
                Why Customers Choose Us
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight">
                Thousands shop with{" "}
                <em className="not-italic text-white/80">complete confidence</em>
              </h2>
            </div>
            <p className="md:max-w-xs font-montserrat text-sm font-semibold text-white/55 leading-relaxed md:text-right">
              Every order is backed by verified reviews, certified credentials, and ironclad buyer
              protection.
            </p>
          </motion.div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white/[0.05] border border-white/12 hover:border-white/25 transition-colors duration-300 flex flex-col gap-3"
              >
                <div className={`absolute top-5 right-5 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${r.badgeClass}`}>
                  {r.badge}
                </div>

                {/* Platform name */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{
                      backgroundColor: r.accentHex + "33",
                      border: `1.5px solid ${r.accentHex}66`,
                      color: r.accentHex,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <span className="font-montserrat text-sm font-bold text-white">{r.name}</span>
                </div>

                {/* Score */}
                <span className="font-playfair text-5xl font-bold text-white leading-none">
                  {r.score}
                </span>

                {/* Stars */}
                {r.stars && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} className="fill-white text-white" />
                    ))}
                  </div>
                )}

                <p className="font-montserrat text-xs font-bold text-white/65">{r.count}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {TRUST_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.1 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.05] border border-white/12"
              >
                <span className="font-playfair text-4xl md:text-5xl font-bold text-white shrink-0">
                  {stat.value}
                </span>
                <div>
                  <p className="font-montserrat text-sm font-bold text-white">{stat.label}</p>
                  <p className="font-montserrat text-xs font-semibold text-white/60 mt-0.5">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {TRUST_BADGES.map(({ Icon, title, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/25 hover:border-white/45 shadow-[0_0_14px_rgba(255,255,255,0.08)] transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-white/75" />
                </div>
                <div>
                  <p className="font-montserrat text-xs font-bold text-white leading-snug">{title}</p>
                  <p className="font-montserrat text-[10px] font-semibold text-white/60 mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="font-montserrat text-xl font-extrabold tracking-[0.3em] uppercase text-white/50">
              Why Choose SUR-RON
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured bike slides ─── */}
      {FEATURED.map((config) => (
        <FeaturedSlide key={config.bikeId} config={config} onViewBike={setModalBike} />
      ))}

      <BikeModal bike={modalBike} onClose={() => setModalBike(null)} />
    </div>
  );
}
