"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SocialIcons = [
  {
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

const companyLinks = [
  { name: "About Us", href: "/#about" },
  { name: "Our Story", href: "/" },
  { name: "Support", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10 md:mb-16 items-start">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-1">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/bikes/storm-bee/surron-logo.png"
                alt="SUR-RON"
                width={300}
                height={132}
                className="w-auto object-contain"
                style={{ height: "8.25rem" }}
              />
            </div>
            <p className="font-montserrat text-sm text-white/70 leading-relaxed mb-5">
              Premium electric motorcycles engineered for those who demand extraordinary performance and uncompromising design.
            </p>
            <div className="flex gap-3">
              {SocialIcons.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full border border-gold/20 hover:border-gold/50 hover:bg-gold/8 flex items-center justify-center text-white/65 hover:text-gold transition-all duration-300"
                >
                  {item.svg}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.25em] uppercase text-gold/75 mb-5">
              Models
            </p>
            <ul className="flex flex-col gap-3">
              {["Light Bee X", "Light Bee S", "Storm Bee", "Ultra Bee", "Surron Light Bee L1E", "Stark Varg", "Talaria Sting R"].map((name) => (
                <li key={name}>
                  <Link
                    href="/browse"
                    className="font-montserrat text-sm text-white/70 hover:text-gold transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.25em] uppercase text-gold/75 mb-5">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="font-montserrat text-sm text-white/70 hover:text-gold transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-montserrat text-[10px] font-semibold tracking-[0.25em] uppercase text-gold/75 mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: Mail, text: "randersonsdanicamaliha@gmail.com" },
                { Icon: Phone, text: "+1 (267) 337-0734" },
                { Icon: MapPin, text: "Doylestown, Pennsylvania" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-gold/65 shrink-0 mt-0.5" />
                  <span className="font-montserrat text-sm text-white/70 break-all">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* Screen image — right side */}
          <div className="hidden lg:flex shrink-0 items-start justify-center pt-1">
            <div className="bg-white rounded-2xl p-3">
              <Image
                src="/images/bikes/storm-bee/screen.png"
                alt="SUR-RON App"
                width={260}
                height={380}
                className="rounded-xl object-contain w-[200px] xl:w-[240px]"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-gold/[0.07] flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4">
          <p className="font-montserrat text-xs text-white/55 text-center md:text-left">
            © 2024 SURON Electric Bikes. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <span key={t} className="font-montserrat text-xs text-white/55 hover:text-gold/60 cursor-pointer transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
