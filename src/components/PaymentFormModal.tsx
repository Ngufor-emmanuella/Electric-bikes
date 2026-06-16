"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "@/context/CartContext";

type Props = {
  method: string | null;
  cartItems?: CartItem[];
  total?: number;
  onClose: () => void;
};

type FormState = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full bg-gold/[0.04] border border-gold/10 focus:border-gold/35 rounded-xl px-4 py-3 font-montserrat text-base text-white placeholder-white/40 outline-none transition-colors duration-200";

const labelClass =
  "font-montserrat text-xs font-semibold tracking-widest uppercase text-gold/65 block mb-1.5";

export default function PaymentFormModal({ method, cartItems = [], total = 0, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setState("sending");
    try {
      const bikeSummary =
        cartItems.length > 0
          ? cartItems.map((i) => `${i.bike.name} (${i.selectedColor.name}) x${i.quantity}`).join(", ")
          : "General inquiry";

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: method,
          bikes: bikeSummary,
          total: total > 0 ? `$${total.toLocaleString()}` : "N/A",
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (!method) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-md bg-[#111111] rounded-3xl border border-gold/12 shadow-[0_0_60px_rgba(255,255,255,0.08)] max-h-[88vh] flex flex-col"
        >
          {/* X button — always visible, outside scroll */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-10 h-10 md:w-9 md:h-9 rounded-full bg-black/70 md:bg-gold/10 hover:bg-white/10 border border-white/40 md:border-gold/30 flex items-center justify-center text-white/90 md:text-gold/70 hover:text-white/60 transition-all shadow-md"
          >
            <X size={17} className="md:hidden" />
            <X size={15} className="hidden md:block" />
          </button>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-7 md:p-8" style={{ scrollbarWidth: "none" }}>
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.88, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center py-6 flex flex-col items-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/35"
                  >
                    <CheckCircle size={18} className="text-emerald-400" strokeWidth={2} />
                    <span className="font-montserrat text-xs font-bold tracking-widest uppercase text-emerald-400">
                      Form Submitted Successfully
                    </span>
                  </motion.div>

                  <h3 className="font-playfair text-2xl font-bold text-white">Inquiry Sent!</h3>
                  <p className="font-montserrat text-sm text-white/60 leading-relaxed max-w-xs">
                    Thank you. Our team will contact you within 24 hours with payment details for your{" "}
                    <span className="text-gold">{method}</span> transaction.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-gold text-black font-montserrat text-xs font-bold tracking-widest uppercase rounded-full hover:bg-gold-light transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Header — pr-10 leaves room for X button */}
                  <div className="mb-6 pr-10">
                    <span className="font-montserrat text-xs font-semibold tracking-[0.25em] uppercase text-gold/70 block mb-1.5">
                      Payment Inquiry
                    </span>
                    <h3 className="font-playfair text-2xl font-bold text-white">{method}</h3>
                    {total > 0 && (
                      <p className="font-montserrat text-base text-white/65 mt-1">
                        Order total:{" "}
                        <span className="text-gold font-semibold">${total.toLocaleString()}</span>
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {state === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        transition={{ duration: 0.28 }}
                        className="flex items-center gap-3 px-4 py-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/30"
                      >
                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                        <p className="font-montserrat text-xs font-semibold text-red-400 flex-1">
                          Form Not Submitted — Please Try Again
                        </p>
                        <button
                          type="button"
                          onClick={() => setState("idle")}
                          className="text-red-400/60 hover:text-red-400 transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {(["name", "email", "phone"] as const).map((field) => (
                      <div key={field}>
                        <label className={labelClass}>
                          {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                        </label>
                        <input
                          name={field}
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          required={field !== "phone"}
                          value={form[field]}
                          onChange={handleChange}
                          placeholder={
                            field === "name"
                              ? "John Smith"
                              : field === "email"
                              ? "john@example.com"
                              : "+1 (555) 000-0000"
                          }
                          className={inputClass}
                        />
                      </div>
                    ))}

                    <div>
                      <label className={labelClass}>Message (optional)</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Any questions or special requests..."
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Honeypot — hidden from real users, bots fill it */}
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      autoComplete="off"
                      tabIndex={-1}
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                    />

                    <motion.button
                      type="submit"
                      disabled={state === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 py-4 bg-gold text-black font-montserrat font-bold text-sm tracking-widest uppercase rounded-2xl hover:bg-gold-light disabled:opacity-60 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      {state === "sending" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <><Send size={14} />Send Inquiry</>
                      )}
                    </motion.button>

                    <p className="font-montserrat text-xs text-white/50 text-center">
                      Our team replies within 24 hours with secure payment details.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
