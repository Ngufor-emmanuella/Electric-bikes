import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us — SURON Electric Bikes",
  description:
    "Get in touch with the SURON team. Questions about bikes, orders, or anything else — we respond within 24 hours.",
};

export default function ContactRoute() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
