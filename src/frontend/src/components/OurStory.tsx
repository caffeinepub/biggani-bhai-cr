import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useRestaurantInfo } from "../hooks/useQueries";

export default function OurStory() {
  const { data: info } = useRestaurantInfo();

  return (
    <section id="story" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story + Chef */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
              Who We Are
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown mb-6">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />

            <div className="rounded-2xl overflow-hidden mb-8 shadow-card">
              <img
                src="/assets/generated/restaurant-interior.dim_800x600.jpg"
                alt="Biggani Bhai C&R Interior"
                className="w-full h-64 object-cover"
              />
            </div>

            <p className="text-brown-mid leading-relaxed mb-4">
              <strong className="text-brown">
                Biggani Bhai Cafe &amp; Restaurant
              </strong>{" "}
              is a beloved local restaurant known for its unique fusion of
              flavors. From momos to biryani, BBQ to desserts, we offer
              something special for everyone.
            </p>
            <p className="text-brown-mid leading-relaxed mb-8">
              আমাদের রেস্টুরেন্টে আসুন এবং আমাদের বিশেষ মেনু উপভোগ করুন। প্রতিটি খাবার তৈরি
              হয় ভালোবাসা ও যত্নের সাথে।
            </p>

            {/* Chef card */}
            <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card shadow-xs">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/40 to-maroon/30 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <div>
                <p className="font-serif font-bold text-brown">
                  Biggani Bhai Kitchen
                </p>
                <p className="text-brown-mid text-sm">
                  Authentic Flavors Since Day One
                </p>
                <p className="text-brown-mid text-xs mt-1">
                  বৈরাগী বাজার খশির, আব্দুল্লাহপুর
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Visit & Contact */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
              Find Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown mb-6">
              Visit Us &amp; Contact
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brown text-sm uppercase tracking-wide mb-1">
                    Address
                  </p>
                  <p className="text-brown-mid">
                    {info?.address ?? "বৈরাগী বাজার খশির, আব্দুল্লাহপুর, Bangladesh"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brown text-sm uppercase tracking-wide mb-1">
                    Phone
                  </p>
                  <p className="text-brown-mid">
                    {info?.phone ?? "01730564953"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brown text-sm uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-brown-mid">
                    {info?.email ?? "bigganiblhaicr@gmail.com"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brown text-sm uppercase tracking-wide mb-1">
                    Opening Hours
                  </p>
                  <p className="text-brown-mid">
                    {info?.openingHours ?? "Mon – Sun: 12:00 PM – 11:00 PM"}
                  </p>
                  <p className="text-brown-mid text-sm">
                    Last orders: 10:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden border border-border shadow-card bg-muted h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-gold mx-auto mb-2" />
                <p className="text-brown-mid text-sm">
                  বৈরাগী বাজার খশির, আব্দুল্লাহপুর
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
