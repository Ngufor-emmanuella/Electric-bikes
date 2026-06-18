import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SUR-RON Electric Bikes — Doylestown, Pennsylvania",
  description:
    "Learn about Electric Bikes Doylestown. Premium SUR-RON electric bikes delivering innovation, performance, and sustainability.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
