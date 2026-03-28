import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Reservations", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="bg-maroon-dark text-cream"
      style={{ borderRadius: "2rem 2rem 0 0" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-3xl font-bold text-gold">
                Biggani Bhai C&amp;R
              </span>
              <p className="text-cream/60 text-sm mt-1 tracking-widest uppercase">
                Cafe &amp; Restaurant
              </p>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Biggani Bhai Cafe &amp; Restaurant brings you authentic flavors
              with a modern twist. Located at বৈরাগী বাজার খশির, আব্দুল্লাহপুর, we serve
              the best food with love.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.facebook.link"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram.link"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.x.link"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
              >
                <SiX size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-gold text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                    className="text-cream/70 hover:text-gold text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  data-ocid="footer.admin.link"
                  className="text-cream/40 hover:text-gold/60 text-xs transition-colors"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-serif text-gold text-lg font-semibold mb-6">
              Contact &amp; Hours
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-cream/70 text-sm">
                  বৈরাগী বাজার খশির, আব্দুল্লাহপুর, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <span className="text-cream/70 text-sm">01730564953</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <div className="text-cream/70 text-sm">
                  <p>Mon – Fri: 12:00 PM – 11:00 PM</p>
                  <p>Sat – Sun: 11:00 AM – 11:30 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/40 text-xs">
            © {year} Biggani Bhai C&amp;R. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
