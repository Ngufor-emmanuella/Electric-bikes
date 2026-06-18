"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import type { Bike } from "@/data/bikes";
import { useCart } from "@/context/CartContext";

type Props = {
  bike: Bike;
  onViewDetails: (bike: Bike) => void;
};

export default function BikeCard({ bike, onViewDetails }: Props) {
  const { addItem } = useCart();
  const [activeColor, setActiveColor] = useState(0);
  const [added, setAdded] = useState(false);

  const color = bike.colors[activeColor];

  const handleAddToCart = () => {
    addItem(bike, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#111111] rounded-2xl overflow-hidden glow-border flex flex-col"
    >
      {/* Bike image */}
      <div
        className="relative overflow-hidden transition-colors duration-500"
        style={{ paddingBottom: "65%", backgroundColor: color.imageBg ?? bike.imageBg ?? "#0d0d0d" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeColor}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={color.image}
              alt={`${bike.name} — ${color.name}`}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 32px), (max-width: 1280px) calc(33vw - 24px), calc(25vw - 24px)"
              quality={80}
            />
          </motion.div>
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-black/55 backdrop-blur-sm rounded-full">
          <span className="font-montserrat text-[11px] font-semibold tracking-widest uppercase text-gold/90">
            {bike.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Color swatches */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {bike.colors.map((c, i) => (
              <motion.button
                key={c.name}
                title={c.name}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveColor(i)}
                className="relative w-4 h-4 rounded-full transition-all duration-200 focus:outline-none"
                style={{
                  backgroundColor: c.hex,
                  border: activeColor === i ? "2px solid #ffffff" : "2px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    activeColor === i ? "0 0 0 1.5px rgba(255,255,255,0.25)" : "none",
                }}
              />
            ))}
          </div>
          <span className="font-montserrat text-sm text-white/55">{color.name}</span>
        </div>

        <h3 className="font-playfair text-xl font-bold text-white mb-0.5">{bike.name}</h3>
        <p className="font-montserrat text-xs text-white/55 tracking-widest uppercase mb-3">
          {bike.model}
        </p>
        <p className="font-montserrat text-[17px] text-white/60 leading-relaxed mb-4 flex-1">
          {bike.tagline}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-5">
          <span className="font-montserrat text-xs text-gold/50 font-medium">USD</span>
          <span className="font-playfair text-3xl font-bold text-gold">
            ${bike.price.toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onViewDetails(bike)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gold/15 hover:border-gold/40 hover:bg-gold/5 text-white/80 hover:text-gold font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300"
          >
            <Eye size={16} />
            Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-montserrat text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
              added
                ? "bg-gold/20 text-gold border border-gold/25"
                : "bg-gold text-black hover:bg-gold-light shadow-[0_0_16px_rgba(255,255,255,0.2)]"
            }`}
          >
            <ShoppingCart size={16} />
            {added ? "Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

