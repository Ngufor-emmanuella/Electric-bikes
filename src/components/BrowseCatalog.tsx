"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, X, ShoppingCart, Eye, Zap, Gauge, Battery, Check } from "lucide-react";
import { bikes, CATEGORIES } from "@/data/bikes";
import type { Bike } from "@/data/bikes";
import BikeModal from "./BikeModal";
import { useCart } from "@/context/CartContext";

const CATEGORY_META: Record<string, { icon: React.ReactNode; description: string }> = {
  "Light Series": {
    icon: <Zap size={22} className="text-gold" />,
    description: "Lightweight, trail-ready perfection",
  },
  "Storm Series": {
    icon: <Gauge size={22} className="text-gold" />,
    description: "Professional enduro powerhouses",
  },
  Street: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-[22px] h-[22px] text-gold">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
    description: "Urban commuters, road-ready",
  },
  "Off-Road": {
    icon: <Battery size={22} className="text-gold" />,
    description: "Pure dirt, pure performance",
  },
};

function BikeCard({ bike, onViewDetails }: { bike: Bike; onViewDetails: () => void }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(bike, bike.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col bg-[#0f0f0f] rounded-2xl border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.07)]"
    >
      {/* Image area */}
      <div
        className="relative aspect-[16/10] overflow-hidden cursor-pointer transition-colors duration-500"
        onClick={onViewDetails}
        style={{ backgroundColor: bike.imageBg ?? "#0d0d0d" }}
      >
        <Image
          src={bike.image}
          alt={bike.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) calc(50vw - 32px), calc(33vw - 32px)"
          quality={95}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30">
            <Eye size={14} className="text-white" />
            <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-white">
              View Details
            </span>
          </div>
        </div>

        {/* In Stock badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.7)]" />
          <span className="font-montserrat text-xs font-semibold tracking-[0.18em] uppercase text-white">
            In Stock
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/30 z-20">
          <span className="font-montserrat text-xs font-semibold tracking-widest uppercase text-gold">
            {bike.category}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <p className="font-montserrat text-xs font-semibold tracking-[0.22em] uppercase text-white/60 mb-1">
            {bike.model}
          </p>
          <h3
            className="font-playfair text-lg font-bold text-white group-hover:text-gold/90 transition-colors duration-200 cursor-pointer"
            onClick={onViewDetails}
          >
            {bike.name}
          </h3>
          <p className="font-montserrat text-sm text-white mt-0.5 line-clamp-2">{bike.tagline}</p>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {bike.colors.slice(0, 5).map((c) => (
            <div
              key={c.name}
              title={c.name}
              className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {bike.colors.length > 5 && (
            <span className="font-montserrat text-xs text-white ml-0.5">
              +{bike.colors.length - 5}
            </span>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 pt-1 border-t border-white/10">
          <span className="font-montserrat text-sm text-white font-medium">USD</span>
          <span className="font-playfair text-2xl font-bold text-gold">
            ${bike.price.toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewDetails}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/25 hover:border-white/60 hover:bg-white/8 text-white font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-200"
          >
            <Eye size={13} />
            View Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-montserrat font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
              added
                ? "bg-gold/12 text-gold border border-gold/20"
                : "bg-gold text-black hover:bg-gold-light shadow-[0_0_16px_rgba(255,255,255,0.2)]"
            }`}
          >
            {added ? <><Check size={12} />Added to Cart</> : <><ShoppingCart size={12} />Add to Cart</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrowseCatalog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number } | null>(null);

  const applyPriceFilter = () => {
    const min = minInput !== "" ? Number(minInput) : 0;
    const max = maxInput !== "" ? Number(maxInput) : Infinity;
    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceFilter({ min, max });
    }
  };

  const clearPriceFilter = () => {
    setPriceFilter(null);
    setMinInput("");
    setMaxInput("");
  };

  const allPrices = bikes.map((b) => b.price);
  const globalMin = Math.min(...allPrices);
  const globalMax = Math.max(...allPrices);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = bikes.filter((b) => b.category === cat).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let list = bikes;
    if (activeCategory !== "All") {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.model.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }
    if (priceFilter) {
      list = list.filter(
        (b) => b.price >= priceFilter.min && b.price <= priceFilter.max
      );
    }
    return list;
  }, [activeCategory, query, priceFilter]);

  return (
    <main className="min-h-screen bg-[#080808] pb-24">
      {/* Hero banner */}
      <div className="relative overflow-hidden pt-44 pb-16 px-6 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.06),transparent)]" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-montserrat text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Full Collection
            </span>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-3">
              Browse Electric Bikes
            </h1>
            <p className="font-montserrat text-base text-white max-w-md">
              Explore our complete lineup — from trail-tearing off-roaders to sleek urban commuters.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Category cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {CATEGORIES.slice(1).map((cat, i) => {
            const meta = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveCategory(isActive ? "All" : cat);
                  setQuery("");
                }}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-gold/10 border-gold/45 shadow-[0_0_24px_rgba(255,255,255,0.14)]"
                    : "bg-white/[0.03] border-white/25 hover:bg-white/[0.06] hover:border-white/45 shadow-[0_0_16px_rgba(255,255,255,0.08)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-card-highlight"
                    className="absolute inset-0 rounded-2xl bg-gold/[0.04]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="mb-3">{meta?.icon}</div>
                  <p className="font-playfair text-base font-bold text-white mb-0.5">{cat}</p>
                  <p className="font-montserrat text-sm text-white mb-2">{meta?.description}</p>
                  <div className="flex items-center gap-1">
                    <span className="font-montserrat text-sm font-bold text-gold">
                      {categoryCounts[cat]}
                    </span>
                    <span className="font-montserrat text-xs text-white uppercase tracking-wider">
                      {categoryCounts[cat] === 1 ? "model" : "models"}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Search + filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or model…"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.06] border border-white/20 focus:border-white/50 font-montserrat text-sm text-white placeholder-white/50 outline-none transition-colors duration-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(cat);
                    setQuery("");
                  }}
                  className={`relative px-4 py-2.5 rounded-xl font-montserrat text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive ? "text-black" : "text-white hover:text-white border border-white/20 hover:border-white/45"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="browse-pill"
                      className="absolute inset-0 rounded-xl bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Price Range Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/15">
            {/* Label */}
            <div className="shrink-0">
              <p className="font-montserrat text-sm font-bold tracking-[0.2em] uppercase text-white mb-1">
                Filter by Price
              </p>
              <p className="font-montserrat text-sm text-white">
                ${globalMin.toLocaleString()} — ${globalMax.toLocaleString()} available
              </p>
            </div>

            {/* Inputs */}
            <div className="flex flex-1 items-center gap-2 flex-wrap">
              {/* Min */}
              <div className="relative flex-1 min-w-[110px]">
                <label className="font-montserrat text-xs font-bold tracking-[0.15em] uppercase text-white block mb-1.5">
                  Min Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-montserrat text-sm font-bold text-white pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={minInput}
                    onChange={(e) => setMinInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                    placeholder={globalMin.toLocaleString()}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 focus:border-white font-montserrat text-sm font-semibold text-white placeholder-white/50 outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="font-montserrat text-sm font-bold text-white mt-5 shrink-0">—</div>

              {/* Max */}
              <div className="relative flex-1 min-w-[110px]">
                <label className="font-montserrat text-xs font-bold tracking-[0.15em] uppercase text-white block mb-1.5">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-montserrat text-sm font-bold text-white pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={maxInput}
                    onChange={(e) => setMaxInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                    placeholder={globalMax.toLocaleString()}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 focus:border-white font-montserrat text-sm font-semibold text-white placeholder-white/50 outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Apply button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={applyPriceFilter}
                className="mt-5 px-6 py-2.5 rounded-xl bg-white text-black font-montserrat font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-200 shadow-[0_0_16px_rgba(255,255,255,0.1)] shrink-0"
              >
                Filter
              </motion.button>
            </div>
          </div>

          {/* Active price filter badge */}
          <AnimatePresence>
            {priceFilter && (
              <motion.div
                key="price-badge"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/25"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span className="font-montserrat text-sm font-bold text-white">
                  Price:&nbsp;
                  <span className="text-white">
                    ${priceFilter.min.toLocaleString()}
                    {priceFilter.max !== Infinity
                      ? ` — $${priceFilter.max.toLocaleString()}`
                      : "+"}
                  </span>
                </span>
                <button
                  onClick={clearPriceFilter}
                  className="ml-1 text-white/70 hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-montserrat text-sm text-white">
            {filtered.length === 0
              ? "No results"
              : `${filtered.length} bike${filtered.length !== 1 ? "s" : ""} found`}
            {activeCategory !== "All" && (
              <span className="text-white"> in {activeCategory}</span>
            )}
            {query && (
              <span className="text-white"> matching &ldquo;{query}&rdquo;</span>
            )}
            {priceFilter && (
              <span className="text-white">
                {" "}within $
                {priceFilter.min.toLocaleString()} — $
                {priceFilter.max === Infinity ? "any" : priceFilter.max.toLocaleString()}
              </span>
            )}
          </p>
          {(query || activeCategory !== "All" || priceFilter) && (
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); clearPriceFilter(); }}
              className="font-montserrat text-sm text-white hover:text-gold transition-colors flex items-center gap-1"
            >
              <X size={11} />
              Clear all
            </button>
          )}
        </div>

        {/* Bike grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((bike) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  onViewDetails={() => setSelectedBike(bike)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-5 bg-white/[0.04]">
                <Search size={22} className="text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                No results found
              </h3>
              <p className="font-montserrat text-base text-white mb-6 max-w-xs">
                We couldn&apos;t find any bikes matching{" "}
                <span className="text-gold">&ldquo;{query}&rdquo;</span>
                {activeCategory !== "All" && (
                  <> in <span className="text-gold">{activeCategory}</span></>
                )}
                . Try a different search term or category.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="px-6 py-3 rounded-xl bg-gold text-black font-montserrat font-bold text-sm tracking-widest uppercase hover:bg-gold-light transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                View All Bikes
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bike detail modal */}
      <BikeModal bike={selectedBike} onClose={() => setSelectedBike(null)} />
    </main>
  );
}
