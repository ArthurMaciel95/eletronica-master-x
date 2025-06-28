import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import ProductSection from "@/src/components/ProductSection";
import ServiceSection from "@/src/components/ServiceSection";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ProductSection />
      <ServiceSection />
      <Footer />
    </main>
  );
}
