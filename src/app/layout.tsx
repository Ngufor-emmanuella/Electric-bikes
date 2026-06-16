import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SURON Electric Bikes | Premium Electric Motorcycles",
  description:
    "Discover the world's finest electric motorcycles. SURON delivers extraordinary performance, unmatched range, and breathtaking design.",
  keywords: "electric bikes, electric motorcycle, suron, off-road electric, street electric",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <CartProvider>
          {children}
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
