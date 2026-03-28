import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend.d";
import { MENU_CATEGORIES, SAMPLE_MENU_ITEMS } from "../data/sampleData";
import { useMenuItems } from "../hooks/useQueries";

const MENU_SKELETON_IDS = ["ms1", "ms2", "ms3", "ms4", "ms5", "ms6"];

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      data-ocid={`menu.item.${index + 1}`}
      className="flex gap-4 items-start p-4 rounded-xl border border-border bg-card hover:border-gold/40 transition-all group"
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-border group-hover:border-gold/40 transition-all"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center border-2 border-border">
          <span className="text-2xl">🍽️</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif font-semibold text-brown text-base leading-tight">
            {item.name}
          </h4>
          <span className="text-gold font-bold text-base whitespace-nowrap">
            ৳{item.price}
          </span>
        </div>
        <p className="text-brown-mid text-xs mt-1 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        {!item.isAvailable && (
          <Badge variant="secondary" className="mt-1 text-xs">
            Unavailable
          </Badge>
        )}
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const { data: backendItems, isLoading } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  const items =
    backendItems && backendItems.length > 0 ? backendItems : SAMPLE_MENU_ITEMS;

  const filtered = items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            Explore Our Offerings
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brown">
            The Menu
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold" />
        </motion.div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList
            data-ocid="menu.category.tab"
            className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-10 p-0"
          >
            {MENU_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="px-5 py-2 rounded-full text-sm font-medium border border-border data-[state=active]:bg-gold data-[state=active]:text-brown data-[state=active]:border-gold hover:border-gold/50 transition-all"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {MENU_CATEGORIES.map((cat) => (
            <TabsContent key={cat} value={cat}>
              {isLoading ? (
                <div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-ocid="menu.loading_state"
                >
                  {MENU_SKELETON_IDS.map((id) => (
                    <Skeleton key={id} className="h-24 rounded-xl" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div
                  className="text-center py-16 text-brown-mid"
                  data-ocid="menu.empty_state"
                >
                  <p className="text-lg">No items in this category yet.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item, i) => (
                      <MenuItemCard
                        key={Number(item.id)}
                        item={item}
                        index={i}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
