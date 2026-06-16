"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle, ArrowLeft, X } from "lucide-react";
import { useState } from "react";

const INFO_CARDS = [
  {
    Icon: MapPin,
    title: "Physical Address",
    lines: ["Doylestown, Pennsylvania"],
    href: undefined,
  },
  {
    Icon: Mail,
    title: "Email Address",
    lines: ["randersonsdanicamaliha@gmail.com"],
    href: "mailto:randersonsdanicamaliha@gmail.com",
  },
  {
    Icon: Phone,
    title: "Phone Numbers",
    lines: ["+1 (267) 337-0734"],
    href: "tel:+12673370734",
  },
];

type State = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.10] focus:border-white/35 rounded-xl px-4 py-3.5 font-montserrat text-base text-white placeholder-white/45 outline-none transition-colors duration-200";

const labelClass =
  "font-montserrat text-[13px] font-bold tracking-[0.22em] uppercase text-white/70 block mb-2";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<State>("idle");

  const handleChange = (e: { target: { name: string; value: string } }) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <>
      {/* ──────────── Hero ──────────── */}
      <section className="flex flex-col md:flex-row min-h-[62vh] overflow-hidden">

        {/* Left: dark text panel */}
        <div className="relative flex-1 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 flex flex-col justify-end px-6 pb-10 pt-52 md:px-16 md:pb-16 md:pt-44">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)",
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
              className="flex items-center gap-2 font-montserrat text-[13px] font-bold tracking-[0.26em] uppercase text-white/60 mb-7"
            >
              <Link href="/" className="hover:text-white/80 transition-colors duration-200">
                Home
              </Link>
              <span className="text-white/35">/</span>
              <span className="text-white/90">Contact Us</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="font-playfair text-[clamp(3rem,7vw,6rem)] font-bold text-white leading-[0.92] mb-5">
                Get In Touch
              </h1>
              <p className="font-montserrat text-base text-white/65 max-w-sm leading-relaxed">
                We&apos;re here to help. Reach out and our team will respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile bike image — same two-image layout as desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex md:hidden relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900 items-center justify-center h-[300px] overflow-hidden"
        >
          {/* Radial glow backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_55%_45%,rgba(255,255,255,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_25%_75%,rgba(255,255,255,0.03),transparent)]" />

          {/* Main image — light-bee-s3, centered */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-[68%] aspect-[4/3]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/bikes/light-bee-s/light-bee-s3.webp"
                alt="Light Bee S — Electric Bike"
                fill
                className="object-contain drop-shadow-[0_6px_36px_rgba(255,255,255,0.18)]"
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>

          {/* Accent image — redefine2, bottom-left corner */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-5 left-5 z-20 w-[34%] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/bikes/light-bee-s/redefine2.jpg"
              alt="Light Bee S Detail"
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
          className="hidden md:flex md:w-[50%] relative bg-gradient-to-br from-zinc-950 via-black to-zinc-900 items-center justify-center overflow-hidden"
        >
          {/* Radial glow backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_55%_50%,rgba(255,255,255,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_75%,rgba(255,255,255,0.03),transparent)]" />

          {/* Main image — light-bee-s3, centered */}
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
                src="/images/bikes/light-bee-s/light-bee-s3.webp"
                alt="Light Bee S — Electric Bike"
                fill
                className="object-contain drop-shadow-[0_8px_48px_rgba(255,255,255,0.18)]"
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>

          {/* Accent image — redefine2, bottom-left corner */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-8 left-8 z-20 w-[36%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/images/bikes/light-bee-s/redefine2.jpg"
              alt="Light Bee S Detail"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Subtle border line on left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </motion.div>
      </section>

      {/* ──────────── Content ──────────── */}
      <section className="py-12 px-4 md:py-24 md:px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.55fr] gap-10 md:gap-16 items-start">

          {/* ── Left: Contact Info ── */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="flex items-center gap-3 font-montserrat text-[13px] font-bold tracking-[0.3em] uppercase text-white/65 mb-4">
                <span className="w-6 h-px bg-white/20" />
                Contact Details
              </span>
              <p className="font-montserrat text-base text-white/65 leading-relaxed">
                Have a question about a bike, an order, or anything else?
                We&apos;d love to hear from you.
              </p>
            </motion.div>

            {INFO_CARDS.map(({ Icon, title, lines, href }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] transition-colors duration-300 group"
              >
                <div className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.05] group-hover:bg-white/[0.09] flex items-center justify-center shrink-0 transition-colors duration-300">
                  <Icon size={17} className="text-white/70" />
                </div>
                <div>
                  <h3 className="font-montserrat text-sm font-bold text-white mb-2">{title}</h3>
                  {lines.map((line) =>
                    href ? (
                      <a
                        key={line}
                        href={href}
                        className="font-montserrat text-sm text-white/65 hover:text-white transition-colors duration-200 block"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="font-montserrat text-sm text-white/65 leading-relaxed">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Business hours callout */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              <p className="font-montserrat text-[13px] font-bold tracking-[0.24em] uppercase text-white/60 mb-3">
                Business Hours
              </p>
              {[
                ["Mon – Fri", "9:00 AM – 6:00 PM EST"],
                ["Saturday", "10:00 AM – 4:00 PM EST"],
                ["Sunday", "Closed"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between font-montserrat text-base py-1.5 border-b border-white/[0.05] last:border-0">
                  <span className="text-white/75">{day}</span>
                  <span className="text-white/90">{hours}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08]"
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="py-14 text-center flex flex-col items-center gap-6"
                >
                  {/* Green success badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/35"
                  >
                    <CheckCircle size={22} className="text-emerald-400" strokeWidth={2} />
                    <span className="font-montserrat text-sm font-bold tracking-widest uppercase text-emerald-400">
                      Form Submitted Successfully
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-playfair text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="font-montserrat text-sm text-white/65 leading-relaxed max-w-xs mx-auto">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </motion.div>

                  <button
                    onClick={() => setState("idle")}
                    className="mt-1 flex items-center gap-2 font-montserrat text-xs font-bold tracking-[0.22em] uppercase text-white/40 hover:text-white/75 transition-colors duration-200"
                  >
                    <ArrowLeft size={11} />
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
                    Send us a message
                  </h2>
                  <p className="font-montserrat text-base text-white/75 mb-8 leading-relaxed">
                    Fill out the form and we&apos;ll respond as soon as possible.
                  </p>

                  {/* Error banner — above form fields */}
                  <AnimatePresence>
                    {state === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 px-5 py-3.5 mb-6 rounded-xl bg-red-500/10 border border-red-500/30"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                        <p className="font-montserrat text-sm font-semibold text-red-400">
                          Form Not Submitted — Please Try Again
                        </p>
                        <button
                          type="button"
                          onClick={() => setState("idle")}
                          className="ml-auto text-red-400/60 hover:text-red-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Row: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Full Name <span className="text-white/25">*</span>
                        </label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Email Address <span className="text-white/25">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className={labelClass}>Subject</label>
                      <input
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help you today?"
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>
                        Comment or Message <span className="text-white/25">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you'd like to know…"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={state === "sending"}
                      whileHover={{ scale: state === "sending" ? 1 : 1.02 }}
                      whileTap={{ scale: state === "sending" ? 1 : 0.97 }}
                      className="flex items-center justify-center gap-2.5 py-4 bg-white text-black font-montserrat font-bold text-sm tracking-[0.18em] uppercase rounded-2xl hover:bg-white/90 disabled:opacity-60 transition-all duration-300 shadow-[0_0_28px_rgba(255,255,255,0.1)]"
                    >
                      {state === "sending" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="font-montserrat text-[13px] text-white/55 text-center leading-relaxed">
                      We respond to all inquiries within 24 business hours.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
