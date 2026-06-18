"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, Zap, Cpu } from "lucide-react";

const RATINGS = [
  { name: "Google Reviews", score: "4.9", bg: "#4285F4", letter: "G" },
  { name: "Trustpilot",     score: "4.8", bg: "#00B67A", letter: "T" },
  { name: "Facebook",       score: "5.0", bg: "#1877F2", letter: "f" },
];

const TECH = [
  {
    Icon: Zap,
    title: "High-Efficiency, Centre-Placed Motor",
    body: "The Light Bee is powered by a high-performance, brushless permanent magnet synchronous motor (PMSM), specifically engineered for optimal performance. Mid-mounted and air-cooled, this motor delivers impressive power density, high-speed capabilities, exceptional temperature resistance, and strong torque output.",
  },
  {
    Icon: Cpu,
    title: "FOC Smart Sine Wave Regulator",
    body: "SurRon eBikes feature a custom-designed, proprietary controller. Equipped with a multi-curve, compound algorithm and real-time monitoring of throttle position, speed, motor torque, and current intensity, the controller continuously analyzes your riding data and adapts to your unique riding style.",
  },
];

const GALLERY = [
  { src: "/images/bikes/light-bee-s/storm-bee5.jpg",   label: "Storm Bee" },
  { src: "/images/bikes/light-bee-s/ultra-bee4.webp",  label: "Ultra Bee" },
  { src: "/images/bikes/light-bee-s/light-bee22.webp", label: "Light Bee" },
  { src: "/images/bikes/light-bee-s/sting3.jpg",       label: "Sting R"   },
];

/* ── Shared card inner content ── */
function CardInner() {
  return (
    <>
      <p className="font-montserrat text-[13px] font-bold text-zinc-900 text-center leading-snug mb-4">
        Trusted by <span className="font-black text-black">70,000+</span>
        <br />buyers / clients worldwide
      </p>
      <div className="flex flex-col gap-2.5">
        {RATINGS.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2.5 px-3 py-2 rounded-full border border-zinc-200 bg-zinc-50"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
              style={{ backgroundColor: r.bg }}
            >
              {r.letter}
            </div>
            <span className="font-montserrat text-sm font-bold text-zinc-800 w-7 shrink-0">
              {r.score}
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} size={11} className="fill-amber-400 text-amber-400" />
              ))}
              <Star size={11} className="fill-amber-200 text-amber-200" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Trusted By widget — same design on all screen sizes ── */
function TrustedByCard() {
  return (
    <div className="flex justify-center">
      {/*
        Container: 316 × 330 px
        Card (white box): left=48, top=48, width=220
        SVG lines extend from each card corner outward through the 48px padding zone
      */}
      <div className="relative" style={{ width: 316, height: 330 }}>
        <svg
          width="316"
          height="330"
          viewBox="0 0 316 330"
          style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
        >
          {/* Top-left corner line */}
          <path d="M 48 78 L 48 24 Q 48 4 28 4 L 0 4"
            stroke="rgba(212,175,55,0.40)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Top-right corner line */}
          <path d="M 268 78 L 268 24 Q 268 4 288 4 L 316 4"
            stroke="rgba(212,175,55,0.40)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Bottom-left corner line */}
          <path d="M 48 262 L 48 308 Q 48 326 28 326 L 0 326"
            stroke="rgba(212,175,55,0.40)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Bottom-right corner line */}
          <path d="M 268 262 L 268 308 Q 268 326 288 326 L 316 326"
            stroke="rgba(212,175,55,0.40)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* 4-pointed sparkle — top-right end */}
          <g transform="translate(308, -4)">
            <path d="M4 0L5.2 3.8L9 4L5.2 4.8L4 8.5L2.8 4.8L-1 4L2.8 3.8Z"
              fill="rgba(212,175,55,0.72)" />
          </g>
          {/* 4-pointed sparkle — bottom-left end */}
          <g transform="translate(-8, 318)">
            <path d="M4 0L5.2 3.8L9 4L5.2 4.8L4 8.5L2.8 4.8L-1 4L2.8 3.8Z"
              fill="rgba(212,175,55,0.72)" />
          </g>
        </svg>

        {/* White card — absolutely positioned inside the padding zone */}
        <div
          className="absolute bg-white rounded-[22px] p-5 border border-zinc-200/60 shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{ left: 48, top: 48, width: 220 }}
        >
          <CardInner />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="flex flex-col md:flex-row min-h-[62vh] overflow-hidden">

        {/* Left dark text panel */}
        <div className="relative flex-1 bg-gradient-to-br from-zinc-950 via-black to-zinc-900
                        flex flex-col justify-end
                        px-6 pb-10 pt-44
                        md:px-16 md:pb-16 md:pt-44">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_100%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:hidden" />

          <div className="relative z-10">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 font-montserrat text-[11px] sm:text-[13px] font-bold tracking-[0.26em] uppercase text-white/60 mb-6 md:mb-7"
            >
              <Link href="/" className="hover:text-white/80 transition-colors duration-200">Home</Link>
              <span className="text-white/35">/</span>
              <span className="text-white/90">About Us</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase text-gold/65 block mb-3">
                Doylestown, Pennsylvania
              </span>
              <h1 className="font-playfair text-[clamp(2.6rem,7vw,6rem)] font-bold text-white leading-[0.92] mb-4 md:mb-5">
                Our Story
              </h1>
              <p className="font-montserrat text-sm sm:text-base text-white/65 max-w-sm leading-relaxed">
                Every engineer is an artist. Every designer is a technologist. We ride in front of the world — fast, clean, and free.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile bike image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex md:hidden relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900
                     items-center justify-center h-[260px] sm:h-[300px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_55%_45%,rgba(255,255,255,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_25%_75%,rgba(255,255,255,0.03),transparent)]" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-[62%] sm:w-[68%] aspect-[4/3]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/bikes/light-bee-s/ultra-bee2.webp"
                alt="SUR-RON Ultra Bee"
                fill
                className="object-contain drop-shadow-[0_6px_36px_rgba(255,255,255,0.18)]"
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-4 left-4 z-20 w-[30%] sm:w-[34%] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/bikes/light-bee-s/storm-bee3.jpg"
              alt="SUR-RON Storm Bee"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Desktop bike image panel */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:flex md:w-[50%] relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900
                     items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_55%_50%,rgba(255,255,255,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_75%,rgba(255,255,255,0.03),transparent)]" />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-[72%] aspect-[4/3]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/bikes/light-bee-s/ultra-bee2.webp"
                alt="SUR-RON Ultra Bee"
                fill
                className="object-contain drop-shadow-[0_8px_48px_rgba(255,255,255,0.18)]"
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-8 left-8 z-20 w-[36%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/bikes/light-bee-s/storm-bee3.jpg"
              alt="SUR-RON Storm Bee"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <section className="py-12 px-4 sm:py-16 md:py-24 md:px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_360px] gap-10 md:gap-16 items-start">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 md:gap-7"
          >
            {/* SEO badge */}
            <div>
              <p className="font-montserrat text-[10px] sm:text-xs font-black tracking-[0.28em] uppercase text-gold/80 mb-1.5 leading-relaxed">
                SUR-RON LIGHT BEE ELECTRIC BIKE | SURRON E BIKE
              </p>
              <p className="font-montserrat text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-white/30 leading-relaxed">
                SURRON BIKE · SURRON ELECTRIC BIKE · SURRON ELECTRIC DIRT BIKE · SURRON BIKE DELIVERY — Doylestown, Pennsylvania
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-gold/40 pl-4 sm:pl-5">
              <p className="font-playfair text-lg sm:text-xl md:text-2xl text-white/90 italic leading-relaxed">
                &ldquo;Every engineer is an artist, every designer is a technologist, and every employee owns more than one motorcycle on average.&rdquo;
              </p>
            </blockquote>

            <p className="font-montserrat text-sm sm:text-base text-white/60 leading-[1.85]">
              We choose to ride in front of the world, go fast as we wish, finer energy, easier control, so that green travel becomes a habit.
            </p>

            <div className="h-px bg-white/[0.06]" />

            <p className="font-montserrat text-sm sm:text-base text-white/65 leading-[1.85]">
              Welcome to <strong className="text-white font-bold">SUR-RON Electric Bikes,</strong> your premier destination for cutting-edge electric bikes that blend innovation, performance, and sustainability. Our mission is to empower riders worldwide with eco-friendly transportation solutions, offering a wide range of e-bikes to suit every lifestyle — from urban commuters to off-road adventurers.
            </p>

            <p className="font-montserrat text-sm sm:text-base text-white/65 leading-[1.85]">
              At <strong className="text-white font-bold">SUR-RON Electric Bikes Doylestown, Pennsylvania,</strong> we are passionate about redefining how people move, promoting clean energy, and delivering exceptional customer experiences.
            </p>

            <blockquote className="border-l-2 border-white/15 pl-4 sm:pl-5">
              <p className="font-montserrat text-sm sm:text-base text-white/50 leading-[1.85] italic">
                Every engineer is an artist, every designer is a technologist, and every employee owns more than one motorcycle on average. We choose to ride in front of the world, go fast as we wish, finer energy, easier control, so that the green travel, becomes a habit.
              </p>
            </blockquote>

            <p className="font-montserrat text-sm sm:text-base text-white/65 leading-[1.85]">
              Join us in making a positive impact on the environment while enjoying the freedom, speed, and fun of electric biking.
            </p>

            <p className="font-playfair text-lg sm:text-xl text-gold/85 italic">
              Let&apos;s ride into the future, together!
            </p>

            {/* 70k stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.10] hover:border-white/20 transition-colors duration-300"
            >
              <span className="font-playfair text-4xl sm:text-5xl font-bold text-white shrink-0 leading-none">
                70k+
              </span>
              <div>
                <p className="font-montserrat text-sm font-bold text-white mb-0.5">Units Sold Globally</p>
                <p className="font-montserrat text-xs text-white/50 leading-relaxed">
                  Since its launch, the Light Bee has gained global recognition, with over 70,000 units sold worldwide.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Trusted By widget (sticky on desktop, flows normally on mobile) */}
          <div className="md:sticky md:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <TrustedByCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TECH FEATURES
      ══════════════════════════════ */}
      <section className="py-12 px-4 sm:py-16 md:py-24 md:px-6 bg-[#060606] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <span className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-gold/55 flex items-center gap-3 mb-3 md:mb-4">
              <span className="w-6 sm:w-8 h-px bg-gold/35" />
              Engineering Excellence
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Built to perform
            </h2>
          </motion.div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8 md:mb-12">
            {TECH.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-5 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.09] hover:border-white/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center mb-4 sm:mb-5">
                  <Icon size={17} className="text-gold" />
                </div>
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
                <p className="font-montserrat text-xs sm:text-sm text-white/55 leading-[1.85]">{body}</p>
              </motion.div>
            ))}
          </div>

          {/* Model gallery — different SUR-RON colors / models */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {GALLERY.map(({ src, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] group
                  ${i === 3 ? "hidden sm:block" : ""}`}
              >
                <Image
                  src={src}
                  alt={`SUR-RON ${label}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 font-montserrat text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-white/85">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}
      <section className="py-12 px-4 sm:py-16 md:py-20 md:px-6 bg-[#080808] border-t border-white/[0.05]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Ready to ride electric?
          </h2>
          <p className="font-montserrat text-sm sm:text-base text-white/55 mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
            Explore our full collection and find the SUR-RON that fits your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/browse"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 bg-white text-black font-montserrat font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white/90 transition-all duration-300 shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            >
              Browse Collection
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 border border-white/25 text-white font-montserrat font-bold text-xs tracking-widest uppercase rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
