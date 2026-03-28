import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Hero() {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pb-24 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/restaurant-hero.dim_1400x800.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B120D]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Biggani Bhai Cafe &amp; Restaurant
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F2E8] leading-tight mb-6">
            Authentic Flavors,
            <br />
            <span className="text-gold italic">Unforgettable</span>
            <br />
            Experience
          </h1>
          <p className="text-[#F7F2E8]/80 text-lg mb-8 font-sans leading-relaxed">
            আমাদের বিশেষ মেনু উপভোগ করুন। বৈরাগী বাজার খশির, আব্দুল্লাহপুরে আমাদের রেস্টুরেন্টে
            আপনাকে স্বাগতম।
          </p>
          <Button
            onClick={scrollToMenu}
            data-ocid="hero.explore_menu.primary_button"
            className="bg-gold hover:bg-gold-dark text-brown font-semibold px-8 py-6 text-base rounded shadow-gold transition-all duration-200"
          >
            Explore Our Menu
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50"
      >
        <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
