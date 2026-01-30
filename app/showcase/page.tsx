import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowcaseGrid from "../components/ShowcaseGrid";

export default function ShowcasePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ShowcaseGrid />
      </main>
      <Footer />
    </>
  );
}
