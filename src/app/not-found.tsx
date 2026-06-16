import Link from "next/link";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-white/30" strokeWidth={1.5} />
        </div>
        <p className="font-montserrat text-xs font-semibold tracking-[0.3em] uppercase text-white/25 mb-3">
          404 — Page Not Found
        </p>
        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white mb-4">
          Lost in the Ride
        </h1>
        <p className="font-montserrat text-base text-white/40 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
      </div>
      <Link
        href="/"
        className="px-8 py-3.5 bg-white text-black font-montserrat font-bold text-sm tracking-widest uppercase rounded-full hover:bg-white/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
