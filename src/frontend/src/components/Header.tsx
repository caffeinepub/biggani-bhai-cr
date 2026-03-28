import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-maroon shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/assets/uploads/fb_img_1774722506042-019d3621-7525-73a8-b7f0-fc9e2727ea1c-2.jpg"
            alt="Biggani Bhai Cafe & Restaurant"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
              className="text-cream/90 hover:text-gold text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Book a Table CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            type="button"
            onClick={() => scrollTo("#reservations")}
            data-ocid="header.book_table.primary_button"
            className="bg-gold hover:bg-gold-dark text-brown font-semibold px-5 py-2 text-sm rounded shadow-gold transition-all duration-200"
          >
            Book a Table
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="lg:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="header.mobile_menu.toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-maroon border-t border-gold/20"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-cream/90 hover:text-gold text-sm font-medium py-2 text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => scrollTo("#reservations")}
                className="bg-gold hover:bg-gold-dark text-brown font-semibold mt-2"
              >
                Book a Table
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
