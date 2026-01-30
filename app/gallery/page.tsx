import GalleryWall from "../components/GalleryWall";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <GalleryWall />
      </main>
      <Footer />
    </>
  );
}
