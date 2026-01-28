import CoreFeatures from "./components/CoreFeatures";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Generator from "./components/Generator";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Generator />
        <Gallery />
        <CoreFeatures />
        <Testimonials />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}
