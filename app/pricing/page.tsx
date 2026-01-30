import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Pricing />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
