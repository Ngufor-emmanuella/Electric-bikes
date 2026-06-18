import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowseCatalog from "@/components/BrowseCatalog";

export const metadata = {
  title: "Browse Electric Bikes — SURON",
  description: "Explore the full SURON electric bike lineup. Filter by category, search by model, and find your perfect ride.",
};

export default function BrowsePage() {
  return (
    <>
      <Navbar />
      <BrowseCatalog />
      <Footer />
    </>
  );
}
