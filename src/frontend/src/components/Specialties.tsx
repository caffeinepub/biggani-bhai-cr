import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const SPECIALTIES = [
  {
    name: "Royal Chicken Biryani",
    description:
      "Fragrant long-grain basmati rice layered with marinated chicken, golden saffron threads, and whole spices. A true feast for the senses.",
    image: "/assets/generated/dish-biryani.dim_600x400.jpg",
    tag: "Chef's Signature",
  },
  {
    name: "Murgh Makhani",
    description:
      "Tender chicken simmered in our house-made velvety tomato and cream sauce, slow-cooked with aromatic spices. The ultimate comfort dish.",
    image: "/assets/generated/dish-butter-chicken.dim_600x400.jpg",
    tag: "Most Popular",
  },
  {
    name: "Golden Samosa Platter",
    description:
      "Crispy handcrafted pastry parcels filled with spiced potatoes and peas, served with house-made mint-coriander chutney and tamarind sauce.",
    image: "/assets/generated/dish-samosa.dim_600x400.jpg",
    tag: "Crowd Favourite",
  },
];

export default function Specialties() {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            Handpicked for You
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown">
            Our Specialities
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {SPECIALTIES.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              data-ocid={`specialties.item.${i + 1}`}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-card group"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-gold text-brown text-xs font-semibold px-3 py-1 rounded-full">
                  {dish.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-brown mb-2">
                  {dish.name}
                </h3>
                <p className="text-brown-mid text-sm leading-relaxed mb-4">
                  {dish.description}
                </p>
                <Button
                  variant="outline"
                  onClick={scrollToMenu}
                  data-ocid={`specialties.view_menu.button.${i + 1}`}
                  className="border-gold text-gold hover:bg-gold hover:text-brown text-sm font-semibold transition-all"
                >
                  View Menu
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
