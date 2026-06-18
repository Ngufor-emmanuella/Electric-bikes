import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BikeShowcase from "@/components/BikeShowcase";
import ScrollStory from "@/components/ScrollStory";
import BikeCategories from "@/components/BikeCategories";
import PaymentSection from "@/components/PaymentSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BikeShowcase />
      <ScrollStory />
      <BikeCategories />
      <PaymentSection />
      <Footer />
    </main>
  );
}
