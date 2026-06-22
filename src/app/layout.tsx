import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: "/images/bikes/storm-bee/surron-logo.png",
    shortcut: "/images/bikes/storm-bee/surron-logo.png",
    apple: "/images/bikes/storm-bee/surron-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <CartProvider>
          {children}
          <ScrollToTop />
        </CartProvider>
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a393389d0dd3e1d406c8842/1jrnn2ki3';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
