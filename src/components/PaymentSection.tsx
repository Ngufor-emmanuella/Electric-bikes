"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import PaymentFormModal from "./PaymentFormModal";

const CRYPTO_OPTIONS = [
  "Bitcoin (BTC)",
  "Ethereum (ETH)",
  "USDT (Tether)",
  "USDC",
  "Solana (SOL)",
  "Litecoin (LTC)",
  "Dogecoin (DOGE)",
  "Other",
];

const methods = [
  {
    name: "Stripe",
    description: "Credit / debit card",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
      </svg>
    ),
  },
  {
    name: "PayPal",
    description: "Secure PayPal checkout",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
  },
  {
    name: "Bank Transfer",
    description: "Wire transfer / SEPA",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
      </svg>
    ),
  },
  {
    name: "Zelle",
    description: "Instant bank payment",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5 17H7.5v-1.75l7.25-7.25H7.5V6.5H17v1.75L9.75 15.5H17V17z"/>
      </svg>
    ),
  },
  {
    name: "Cryptocurrency",
    description: "BTC, ETH, USDT & more",
    crypto: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5v1h-2v-1c-1.4-.3-2.5-1.3-2.5-2.9h2c0 .8.6 1.4 1.5 1.4s1.5-.4 1.5-1.2c0-.8-.6-1.2-1.5-1.2-2.2 0-3.5-1-3.5-2.8 0-1.4 1-2.4 2.5-2.8V6h2v1c1.3.3 2.2 1.2 2.2 2.7h-2c0-.7-.4-1.2-1.2-1.2s-1.3.5-1.3 1.2.5 1.2 1.3 1.2c2.2 0 3.5 1 3.5 2.8 0 1.5-1 2.5-2.5 2.8z"/>
      </svg>
    ),
  },
  {
    name: "Cash App",
    description: "Pay via Cash App",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm.641 17.116v.986h-1.402v-.957c-1.12-.143-2.145-.67-2.699-1.371l.938-1.134c.502.558 1.218.941 1.986.941.768 0 1.242-.352 1.242-.917 0-.545-.43-.839-1.521-1.117-1.525-.394-2.688-1.002-2.688-2.574 0-1.262.882-2.199 2.23-2.487v-.985h1.402v.95c.957.13 1.776.582 2.302 1.197l-.919 1.099c-.45-.493-1.05-.796-1.735-.796-.672 0-1.099.313-1.099.84 0 .527.45.79 1.6 1.09 1.641.43 2.619 1.082 2.619 2.623 0 1.319-.915 2.267-2.256 2.612z"/>
      </svg>
    ),
  },
  {
    name: "Chime",
    description: "Pay with Chime",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    description: "Touch ID / Face ID",
    crypto: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  },
];

export default function PaymentSection() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [cryptoPickerOpen, setCryptoPickerOpen] = useState(false);

  const handleMethodClick = (method: typeof methods[0]) => {
    if (method.crypto) {
      setCryptoPickerOpen(true);
    } else {
      setActiveMethod(method.name);
    }
  };

  return (
    <section className="pt-12 pb-24 px-6 border-t border-gold/[0.07]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-montserrat text-base font-extrabold tracking-[0.3em] uppercase text-gold/55 block mb-4">
            Flexible Payments
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Secure Payment Methods
          </h2>
          <p className="font-montserrat text-base text-white/75 max-w-sm mx-auto">
            Choose your preferred payment method. Our team will guide you through a secure transaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {methods.map((method, i) => (
            <motion.button
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleMethodClick(method)}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-gold/[0.03] border border-gold/[0.08] hover:bg-gold/[0.08] hover:border-gold/25 transition-all duration-300 glow-border"
            >
              <div className="text-gold/60 group-hover:text-gold transition-colors duration-300">
                {method.icon}
              </div>
              <div className="text-center">
                <p className="font-montserrat text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {method.name}
                </p>
                <p className="font-montserrat text-xs text-white/55 mt-0.5">{method.description}</p>
                {method.crypto && (
                  <span className="inline-flex items-center gap-0.5 mt-1 font-montserrat text-[10px] text-gold/50 group-hover:text-gold/80 transition-colors">
                    Select coin <ChevronDown size={10} />
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center font-montserrat text-lg italic text-white/60 mt-8"
        >
          Click any method above to submit a payment inquiry. Our team responds within 24 hours.
        </motion.p>
      </div>

      {/* ── Crypto picker modal ── */}
      <AnimatePresence>
        {cryptoPickerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setCryptoPickerOpen(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 w-full max-w-sm bg-[#111111] rounded-3xl border border-gold/15 shadow-[0_0_60px_rgba(255,255,255,0.08)] p-7"
            >
              {/* Close */}
              <button
                onClick={() => setCryptoPickerOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 transition-all"
              >
                <X size={14} />
              </button>

              <p className="font-montserrat text-[10px] font-bold tracking-[0.28em] uppercase text-gold/55 mb-1">
                Cryptocurrency
              </p>
              <h3 className="font-playfair text-xl font-bold text-white mb-5">
                Select your coin
              </h3>

              <div className="flex flex-col gap-2">
                {CRYPTO_OPTIONS.map((coin) => (
                  <motion.button
                    key={coin}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveMethod(`Cryptocurrency — ${coin}`);
                      setCryptoPickerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/[0.04] border border-gold/[0.08] hover:bg-gold/[0.10] hover:border-gold/25 transition-all duration-200 text-left group"
                  >
                    <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold/70">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5v1h-2v-1c-1.4-.3-2.5-1.3-2.5-2.9h2c0 .8.6 1.4 1.5 1.4s1.5-.4 1.5-1.2c0-.8-.6-1.2-1.5-1.2-2.2 0-3.5-1-3.5-2.8 0-1.4 1-2.4 2.5-2.8V6h2v1c1.3.3 2.2 1.2 2.2 2.7h-2c0-.7-.4-1.2-1.2-1.2s-1.3.5-1.3 1.2.5 1.2 1.3 1.2c2.2 0 3.5 1 3.5 2.8 0 1.5-1 2.5-2.5 2.8z"/>
                      </svg>
                    </div>
                    <span className="font-montserrat text-sm font-semibold text-white/75 group-hover:text-white transition-colors">
                      {coin}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentFormModal method={activeMethod} onClose={() => setActiveMethod(null)} />
    </section>
  );
}
