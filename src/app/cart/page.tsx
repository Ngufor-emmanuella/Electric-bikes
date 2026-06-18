"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentFormModal from "@/components/PaymentFormModal";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
  { name: "Bitcoin", symbol: "₿" },
  { name: "Ethereum", symbol: "Ξ" },
  { name: "Stripe", symbol: "S" },
  { name: "PayPal", symbol: "P" },
  { name: "Bank Transfer", symbol: "⇄" },
  { name: "Crypto", symbol: "◎" },
];

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <ShoppingCart size={64} className="text-gold/30 mx-auto mb-6" strokeWidth={1} />
            <h2 className="font-playfair text-4xl font-bold text-white mb-3">Your cart is empty</h2>
            <p className="font-montserrat text-base text-white mb-8">
              Discover our collection and add a bike you love.
            </p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-black font-montserrat font-bold text-sm tracking-widest uppercase rounded-full hover:bg-gold-light shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all duration-300"
            >
              <ArrowLeft size={15} />
              Browse Bikes
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl border border-white/30 font-montserrat text-sm text-white hover:text-black hover:bg-white hover:border-white transition-all duration-200 mb-6 w-fit"
            >
              <ArrowLeft size={13} />
              Continue Shopping
            </Link>
            <h1 className="font-playfair text-5xl font-bold text-white">Your Cart</h1>
            <p className="font-montserrat text-base text-white mt-2">
              {items.length} {items.length === 1 ? "item" : "items"} selected
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.bike.id}-${item.selectedColor.name}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-4 p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    {/* Image */}
                    <div
                      className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 80% at 50% 45%, #ffffff 0%, #f0f0f0 55%, #d8d8d8 100%)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{ filter: item.selectedColor.filter }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={item.bike.image}
                          alt={item.bike.name}
                          fill
                          className="object-contain p-2"
                          sizes="112px"
                        />
                      </motion.div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-playfair text-lg font-bold text-white">
                            {item.bike.name}
                          </h3>
                          <p className="font-montserrat text-sm text-white mt-0.5">
                            {item.bike.model}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="font-montserrat text-sm text-white">
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.bike.id, item.selectedColor.name)}
                          className="text-white hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.bike.id, item.selectedColor.name, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 flex items-center justify-center text-white hover:text-white transition-all"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-montserrat text-sm font-semibold text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.bike.id, item.selectedColor.name, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 flex items-center justify-center text-white hover:text-white transition-all"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="font-playfair text-xl font-bold text-gold">
                          ${(item.bike.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-28 flex flex-col gap-5"
            >
              {/* Summary box */}
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10">
                <h3 className="font-playfair text-xl font-bold text-white mb-5">Order Summary</h3>

                <div className="flex flex-col gap-3 mb-5 pb-5 border-b border-white/10">
                  {items.map((item) => (
                    <div
                      key={`${item.bike.id}-${item.selectedColor.name}`}
                      className="flex justify-between items-center"
                    >
                      <span className="font-montserrat text-sm text-white">
                        {item.bike.name} ×{item.quantity}
                      </span>
                      <span className="font-montserrat text-sm font-semibold text-white">
                        ${(item.bike.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-montserrat text-sm text-white">Total</span>
                  <span className="font-playfair text-3xl font-bold text-gold">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <p className="font-montserrat text-xs text-white text-center">
                  Prices in USD. Shipping calculated at checkout.
                </p>
              </div>

              {/* Payment methods */}
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10">
                <p className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
                  Choose Payment Method
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map((m) => (
                    <motion.button
                      key={m.name}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedPayment(m.name)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 ${
                        selectedPayment === m.name
                          ? "border-gold/50 bg-gold/10"
                          : "border-white/15 hover:border-white/35 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className={`text-lg font-bold ${selectedPayment === m.name ? "text-gold" : "text-white"}`}>
                        {m.symbol}
                      </span>
                      <span className="font-montserrat text-xs font-semibold text-white text-center leading-tight">
                        {m.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <p className="font-montserrat text-xs text-white text-center mt-3">
                  Select a method to proceed
                </p>
              </div>

              {/* Checkout button */}
              {selectedPayment && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {/* handled by PaymentFormModal */}}
                  className="w-full py-4 rounded-2xl bg-gold text-black font-montserrat font-bold text-sm tracking-widest uppercase shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:bg-gold-light transition-all duration-300"
                >
                  Proceed with {selectedPayment}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

      <PaymentFormModal
        method={selectedPayment}
        cartItems={items}
        total={total}
        onClose={() => setSelectedPayment(null)}
      />
    </>
  );
}
