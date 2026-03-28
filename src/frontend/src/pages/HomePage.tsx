import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import OurStory from "../components/OurStory";
import ReservationSection from "../components/ReservationSection";
import Specialties from "../components/Specialties";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Specialties />
        <MenuSection />
        <OurStory />
        <ReservationSection />
      </main>
      <Footer />
    </div>
  );
}
