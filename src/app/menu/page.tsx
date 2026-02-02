"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Star, Check, Users } from "lucide-react";
import { MENU_CATEGORIES, DIETARY_FILTERS, PACKAGE_TIERS } from "@/lib/constants";
import { menuItems, MenuItem } from "@/data/menu";
import { CTASection } from "@/components/sections";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDietary, setActiveDietary] = useState<string[]>([]);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      activeCategory === "all" || item.category === activeCategory;
    const dietaryMatch =
      activeDietary.length === 0 ||
      activeDietary.every((d) => item.dietary.includes(d));
    return categoryMatch && dietaryMatch;
  });

  const toggleDietary = (filter: string) => {
    setActiveDietary((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-chamomile">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              Explore Our Offerings
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-brown mt-2 mb-6"
            >
              Our <span className="text-orange">Menu</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brown/70 leading-relaxed mb-8"
            >
              Every dish is made with love, using authentic recipes passed down
              through generations. Browse our offerings and discover your
              favorites.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="/menu.pdf"
              className="btn-secondary inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Menu PDF
            </motion.a>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-16 bg-brown">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-montserrat font-semibold uppercase tracking-wider text-sm">
                Crafted With Care
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mt-2 mb-4">
                See Our Dishes Come to Life
              </h2>
              <div className="w-16 h-1 bg-gold mb-6" />
              <p className="text-white/80 leading-relaxed mb-6">
                Every dish from KDS Comfort Food is prepared with love and attention
                to detail. From perfectly roasted meats to beautifully arranged
                platters, Chef Yaya brings artistry to every meal.
              </p>
              <p className="text-white/60 text-sm">
                Watch our culinary team in action and see why our clients call our
                presentations &ldquo;consistently clean, polished, and visually appealing.&rdquo;
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                className="w-full aspect-video object-cover"
                poster="/images/food/braised-oxtails.jpg"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/videos/roasted-turkey.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Package Tiers - Restyled with true white cards */}
      <section className="py-16 bg-oat">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-sage font-montserrat font-semibold uppercase tracking-wider text-sm">
              Catering Options
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-brown mt-2 mb-2">
              Catering Packages
            </h2>
            <p className="text-brown/60">
              Choose the perfect package for your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PACKAGE_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-6 transition-all duration-300 border",
                  tier.popular
                    ? "bg-white scale-105 shadow-xl border-orange/30 ring-2 ring-orange/20"
                    : "bg-white shadow-md border-cream-200 hover:shadow-lg"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-montserrat font-bold px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Thin serif title style */}
                <h3 className="text-2xl font-cormorant font-semibold text-brown mb-1 tracking-wide">
                  {tier.name}
                </h3>
                <p className="text-sm text-brown/60 mb-4">
                  {tier.description}
                </p>
                
                {/* Price chip */}
                <div className="inline-flex items-center bg-persimmon/10 text-persimmon px-3 py-1.5 rounded-full mb-4">
                  <span className="text-sm font-montserrat font-bold">
                    {tier.priceRange}
                  </span>
                </div>

                {/* Serves metadata */}
                <div className="flex items-center text-brown/50 text-xs mb-4">
                  <Users className="w-3.5 h-3.5 mr-1" />
                  <span>Serves 25+</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 flex-shrink-0",
                          tier.popular ? "text-orange" : "text-sage"
                        )}
                      />
                      <span className="text-brown/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            {/* Category Tabs with aria-pressed */}
            <div 
              className="flex flex-wrap justify-center gap-2 mb-6"
              role="group"
              aria-label="Filter by category"
            >
              <button
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
                className={cn(
                  "px-4 py-2 rounded-full font-montserrat text-sm font-medium transition-colors",
                  activeCategory === "all"
                    ? "bg-orange text-white"
                    : "bg-cream text-brown hover:bg-orange/10"
                )}
              >
                All Items
              </button>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={cn(
                    "px-4 py-2 rounded-full font-montserrat text-sm font-medium transition-colors",
                    activeCategory === cat.id
                      ? "bg-orange text-white"
                      : "bg-cream text-brown hover:bg-orange/10"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dietary Filters with aria-pressed */}
            <div 
              className="flex justify-center gap-4"
              role="group"
              aria-label="Filter by dietary preference"
            >
              {DIETARY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleDietary(filter.id)}
                  aria-pressed={activeDietary.includes(filter.id)}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-full border-2 font-montserrat text-sm font-medium transition-colors",
                    activeDietary.includes(filter.id)
                      ? "border-sage bg-sage/10 text-sage"
                      : "border-brown/20 text-brown/60 hover:border-sage/50"
                  )}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeDietary.join(",")}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brown/60 font-montserrat">
                No items match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white border border-cream-200 rounded-xl p-6 relative shadow-sm hover:shadow-md transition-shadow"
    >
      {item.popular && (
        <div className="absolute top-4 right-4 flex items-center text-gold">
          <Star className="w-4 h-4 fill-gold" />
          <span className="text-xs font-montserrat font-semibold ml-1">
            Popular
          </span>
        </div>
      )}

      <span className="text-xs font-montserrat text-sage uppercase tracking-wider font-semibold">
        {MENU_CATEGORIES.find((c) => c.id === item.category)?.name}
      </span>

      <h3 className="font-playfair font-semibold text-xl text-brown mt-1 mb-2">
        {item.name}
      </h3>

      <p className="text-brown/60 text-sm mb-4">{item.description}</p>

      {item.dietary.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.dietary.map((d) => {
            const filter = DIETARY_FILTERS.find((f) => f.id === d);
            return (
              <span
                key={d}
                className="text-xs bg-chamomile rounded-full px-2 py-1 text-brown/70"
              >
                {filter?.icon} {filter?.label}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
