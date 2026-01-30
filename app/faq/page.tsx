import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
