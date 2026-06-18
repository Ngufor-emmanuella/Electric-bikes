"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { bikes } from "@/data/bikes";

type StorySection = {
  tag: string;
  title: string;
  body: string;
  stat: { value: string; label: string };
  side: "left" | "right";
  bikeIndex: number;
  images?: string[];
  split?: boolean;
  showReadMore?: boolean;
};

const sections: StorySection[] = [
  {
    tag: "Off-Road Performance",
    title: "Ride Without\nLimits.",
    body: "Every trail surrenders to the Light Bee X. With its 6000W mid-drive motor and race-calibrated suspension, no terrain is off-limits. Our lightweight aluminium frame delivers razor-sharp handling that transforms every ride into an experience.",
    stat: { value: "75 mph", label: "Off-road top speed" },
    showReadMore: true,
    side: "left",
    bikeIndex: 0,
    images: [
      "/images/bikes/light-bee-s/suron-fr.jpg",
      "/images/bikes/light-bee-s/suron-fr2.jpg",
      "/images/bikes/light-bee-s/suron-fr3.jpg",
    ],
  },
  {
    tag: "Battery Technology",
    title: "Pure Electric\nPower.",
    body: "Our proprietary lithium-ion battery systems deliver consistent, powerful performance across every ride. Intelligent battery management, rapid charging, and industry-leading energy density mean you spend more time riding and less time waiting.",
    stat: { value: "150 km", label: "Maximum range" },
    side: "left",
    bikeIndex: 2,
    split: true,
    images: [
      "/images/bikes/light-bee-s/batery1.jpg",
      "/images/bikes/light-bee-s/batery2.jpg",
      "/images/bikes/light-bee-s/batery3.jpg",
      "/images/bikes/light-bee-s/batery4.jpg",
    ],
  },
  {
    tag: "Urban Mobility",
    title: "Own Every\nStreet.",
    body: "The city is your circuit. Our street series transforms urban commuting into something truly exciting — silent, swift, and beautifully designed. Zero emissions. Zero compromises. Just you and the open road ahead.",
    stat: { value: "Zero", label: "Emissions" },
    side: "right",
    bikeIndex: 4,
    split: true,
    images: [
      "/images/bikes/light-bee-s/street1.jpg",
      "/images/bikes/light-bee-s/street2.jpg",
      "/images/bikes/light-bee-s/street3.jpg",
    ],
  },
  {
    tag: "Peak Engineering",
    title: "Performance\nRedefined.",
    body: "The Storm Bee isn't just an electric motorcycle — it's a statement. With 22,500W of peak power, Brembo brakes, and WP suspension, it competes directly with the world's finest enduro machines. This is electric performance at its absolute zenith.",
    stat: { value: "22.5kW", label: "Peak power" },
    side: "left",
    bikeIndex: 2,
    split: true,
    images: [
      "/images/bikes/light-bee-s/redefine1.jpg",
      "/images/bikes/light-bee-s/redefine2.jpg",
      "/images/bikes/light-bee-s/redefine3.jpg",
      "/images/bikes/light-bee-s/redefine4.jpg",
    ],
  },
];

/* ── Split layout: image panel + text panel side by side ── */
function SplitStoryBlock({ section }: { section: StorySection }) {
  const slides = section.images!;
  const [slideIdx, setSlideIdx] = useState(0);
  const next = useCallback(() => setSlideIdx((p) => (p + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  // text on the right → images on the left (and vice-versa)
  const imagesLeft = section.side === "right";

  const imagePanel = (
    <motion.div
      initial={{ opacity: 0, x: imagesLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full md:w-1/2 h-[50vw] md:h-full overflow-hidden rounded-2xl md:rounded-none"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[slideIdx]}
            alt={`${section.title} image ${slideIdx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* subtle dark vignette on edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      <div className={`absolute inset-0 pointer-events-none ${imagesLeft ? "bg-gradient-to-r from-transparent to-black/30" : "bg-gradient-to-l from-transparent to-black/30"}`} />

      {/* dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === slideIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/65"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );

  const textPanel = (
    <motion.div
      initial={{ opacity: 0, x: imagesLeft ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full md:w-1/2 flex items-center px-8 py-12 md:px-16 md:py-0"
    >
      <div className="max-w-lg w-full">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 font-montserrat text-sm font-bold tracking-[0.28em] uppercase text-gold/55 mb-5"
        >
          <span className="w-4 h-px bg-gold/35" />
          {section.tag}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line"
        >
          {section.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="font-montserrat text-base md:text-[17px] text-white/50 leading-[1.75] mb-8"
        >
          {section.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="flex items-end gap-3 border-l-2 border-gold/30 pl-4"
        >
          <span className="font-playfair text-4xl font-bold text-gold leading-none">
            {section.stat.value}
          </span>
          <span className="font-montserrat text-sm font-bold text-white/35 tracking-widest uppercase mb-1">
            {section.stat.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative min-h-[90vh] flex items-center bg-[#080808] overflow-hidden border-y border-white/[0.04]">
      <div className={`w-full flex flex-col md:flex-row md:h-[90vh] ${imagesLeft ? "" : "md:flex-row-reverse"}`}>
        {imagePanel}
        {textPanel}
      </div>
    </div>
  );
}

/* ── Full-screen background layout ── */
function StoryBlock({ section }: { section: StorySection }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.08, 1, 1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 0.65, 0.65, 0.9]);

  const isLeft = section.side === "left";
  const bike = bikes[section.bikeIndex];

  const slides = section.images ?? [bike.heroImage];
  const hasSlider = slides.length > 1;
  const [slideIdx, setSlideIdx] = useState(0);
  const next = useCallback(() => setSlideIdx((p) => (p + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (!hasSlider) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [hasSlider, next]);

  return (
    <div ref={ref} className="relative h-screen flex items-center overflow-hidden">
      <motion.div
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 -z-10"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[slideIdx]}
              alt={section.title}
              fill
              className="object-cover"
              priority={false}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className={`absolute inset-0 ${
          isLeft
            ? "bg-gradient-to-r from-black via-black/80 to-transparent"
            : "bg-gradient-to-l from-black via-black/80 to-transparent"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: isLeft ? 0 : 1 }}
        className={`absolute top-1/2 ${
          isLeft ? "left-0" : "right-0"
        } w-1/4 h-px bg-gradient-to-${isLeft ? "r" : "l"} from-gold/30 to-transparent`}
      />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full flex ${
          isLeft ? "justify-start" : "justify-end"
        }`}
      >
        <motion.div
          initial={{ x: isLeft ? -90 : 90, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-lg"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 font-montserrat text-sm font-bold tracking-[0.28em] uppercase text-gold/55 mb-5"
          >
            <span className="w-4 h-px bg-gold/35" />
            {section.tag}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line"
          >
            {section.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="font-montserrat text-base md:text-[17px] text-white/50 leading-[1.75] mb-8"
          >
            {section.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="flex items-end gap-3 border-l-2 border-gold/30 pl-4"
          >
            <span className="font-playfair text-4xl font-bold text-gold leading-none">
              {section.stat.value}
            </span>
            <span className="font-montserrat text-sm font-bold text-white/35 tracking-widest uppercase mb-1">
              {section.stat.label}
            </span>
          </motion.div>

          {hasSlider && (
            <div className="flex items-center gap-2 mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ${
                    i === slideIdx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          )}

          {section.showReadMore && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gold/40 text-gold font-montserrat text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold/10 hover:border-gold/65 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              >
                Read More
                <ChevronRight size={14} />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section id="about">
      {sections.map((s, i) => {
        const prevIsFull = i > 0 && !sections[i - 1].split;
        return s.split ? (
          <div
            key={s.title}
            className={prevIsFull ? "mt-20 md:mt-28 mb-16 md:mb-20" : "mt-16 md:mt-20 mb-16 md:mb-20"}
          >
            <SplitStoryBlock section={s} />
          </div>
        ) : (
          <StoryBlock key={s.title} section={s} />
        );
      })}
    </section>
  );
}
