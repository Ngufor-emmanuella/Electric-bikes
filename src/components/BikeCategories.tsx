"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bikes, CATEGORIES } from "@/data/bikes";
import type { Bike } from "@/data/bikes";
import BikeCard from "./BikeCard";
import BikeModal from "./BikeModal";

const CATEGORY_LIMITS: Record<string, number> = {
  "Light Series": 2,
  "Storm Series": 2,
  "Street": 3,
  "Off-Road": 3,
};

const HOME_CATEGORY_ORDER = ["Light Series", "Storm Series", "Street", "Off-Road"] as const;

function getDisplayBikes(category: string, allBikes: Bike[]): Bike[] {
  if (category === "All") {
    return HOME_CATEGORY_ORDER.flatMap((cat) =>
      allBikes.filter((b) => b.category === cat).slice(0, CATEGORY_LIMITS[cat])
    );
  }
  const limit = CATEGORY_LIMITS[category] ?? Infinity;
  return allBikes.filter((b) => b.category === category).slice(0, limit);
}

export default function BikeCategories() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const homeBikes = bikes.filter((b) => b.id !== "talaria-sting-r");

  const filtered = getDisplayBikes(activeCategory, homeBikes);

  return (
    <section id="bikes" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <span className="font-montserrat text-sm font-bold tracking-[0.3em] uppercase text-gold/60 block mb-4">
          Our Collection
        </span>
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
          Find Your Ride
        </h2>
        <p className="font-montserrat text-lg text-white/75 max-w-md mx-auto">
          Eight extraordinary machines. One extraordinary brand.
        </p>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count = getDisplayBikes(cat, homeBikes).length;
          return (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full font-montserrat text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "text-black"
                  : "bg-gold/5 text-white/50 hover:bg-gold/10 hover:text-gold/80 border border-gold/10"
              }`}
            >
              {cat}
              <span className={`ml-2 text-[10px] font-normal ${isActive ? "text-black/50" : "text-white/25"}`}>
                {count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-gold -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bikes grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((bike) => (
            <BikeCard key={bike.id} bike={bike} onViewDetails={setSelectedBike} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* See More Bikes button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mt-14"
      >
        <Link href="/browse">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold hover:border-gold text-gold hover:text-black font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            See More Bikes
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
      </motion.div>

      {/* Bike detail modal */}
      <BikeModal bike={selectedBike} onClose={() => setSelectedBike(null)} />
    </section>
  );
}

