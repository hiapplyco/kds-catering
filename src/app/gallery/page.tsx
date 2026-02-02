"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { CTASection } from "@/components/sections";
import { VideoModal } from "@/components/ui";
import { cn } from "@/lib/utils";

const galleryCategories = [
  { id: "all", name: "All" },
  { id: "food", name: "Food" },
  { id: "events", name: "Events" },
  { id: "chef", name: "Chef Yaya" },
];

const galleryVideos = [
  {
    id: 1,
    src: "/videos/roasted-turkey.mp4",
    poster: "/images/food/braised-oxtails.jpg",
    title: "Roasted Turkey with Cranberries & Herbs",
    description: "Holiday perfection",
  },
  {
    id: 2,
    src: "/videos/decorative-salad.mp4",
    poster: "/images/food/garden-salad-platter.jpg",
    title: "Artisan Salad Presentation",
    description: "Fresh & beautiful",
  },
  {
    id: 3,
    src: "/videos/street-tacos-platter.mp4",
    poster: "/images/food/garden-salad-platter.jpg",
    title: "Garden Fresh Platter",
    description: "Farm to table",
  },
  {
    id: 4,
    src: "/videos/catering-trays.mp4",
    poster: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    title: "Catering Spread",
    description: "Full service excellence",
  },
];

// Vertical videos for social-style showcase
const verticalVideos = [
  {
    id: 1,
    src: "/videos/mashed-potatoes-mac-cheese-vertical.mp4",
    poster: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    title: "Comfort Food Catering",
    description: "Creamy mashed potatoes & mac and cheese",
  },
  {
    id: 2,
    src: "/videos/catering-flyers-promo-vertical.mp4",
    poster: "/images/food/catering-spread-caesar-salads.jpeg",
    title: "About KDS Catering",
    description: "Our services & offerings",
  },
];

const galleryImages = [
  // Food Images - Elevated Presentation
  {
    id: 1,
    src: "/images/food/guacamole-bread-cups-edible-flowers.jpg",
    alt: "Guacamole Bread Cups with Edible Flowers",
    category: "food",
  },
  // NEW: Rainbow Vegetable Crudité
  {
    id: 24,
    src: "/images/food/rainbow-vegetable-crudite-platter-hummus.jpg",
    alt: "Rainbow Vegetable Crudité Platter with Hummus",
    category: "food",
  },
  // NEW: Roasted Turkey
  {
    id: 25,
    src: "/images/food/roasted-turkey-cranberries-orange-herbs.jpg",
    alt: "Roasted Turkey with Cranberries, Orange & Fresh Herbs",
    category: "food",
  },
  // NEW: Fried Chicken Buffet
  {
    id: 26,
    src: "/images/food/fried-chicken-rice-buffet-edible-flowers.jpg",
    alt: "Fried Chicken & Yellow Rice Buffet with Edible Flowers",
    category: "events",
  },
  // NEW: Shrimp Appetizers
  {
    id: 27,
    src: "/images/food/guacamole-bread-cups-edible-flowers.jpg",
    alt: "Shrimp Guacamole & Mango Salsa Appetizer Cups",
    category: "food",
  },
  {
    id: 2,
    src: "/images/food/glazed-salmon-noodles-meal-prep.jpg",
    alt: "Glazed Salmon with Noodles - Chef Yaya Signature",
    category: "food",
  },
  {
    id: 3,
    src: "/images/food/braised-oxtails.jpg",
    alt: "Braised Oxtails with Butter Beans",
    category: "food",
  },
  {
    id: 4,
    src: "/images/food/fruit-platter-orange-rose-garnish.jpg",
    alt: "Fruit Platter with Orange Rose Garnish",
    category: "food",
  },
  {
    id: 5,
    src: "/images/food/jerk-chicken-rice-peas.jpeg",
    alt: "Jerk Chicken with Rice & Peas",
    category: "food",
  },
  {
    id: 6,
    src: "/images/food/cookie-brownie-platters-strawberry-roses.jpg",
    alt: "Dessert Platter with Cookies, Brownies & Strawberry Roses",
    category: "food",
  },
  {
    id: 7,
    src: "/images/food/fruit-salad-cups.jpg",
    alt: "Fresh Fruit Salad Cups - Elegant Presentation",
    category: "food",
  },
  {
    id: 8,
    src: "/images/food/creamy-penne-pasta-vegetables.jpg",
    alt: "Creamy Penne Pasta with Vegetables",
    category: "food",
  },
  {
    id: 9,
    src: "/images/food/catering-spread-caesar-salads.jpeg",
    alt: "Catering Spread with Caesar Salads",
    category: "events",
  },
  {
    id: 10,
    src: "/images/food/boxed-lunches-sandwich-pasta-cookies.jpg",
    alt: "Boxed Lunches with Sandwiches, Pasta & Cookies",
    category: "events",
  },
  {
    id: 11,
    src: "/images/food/arroz-con-pollo.jpg",
    alt: "Arroz con Pollo - Chicken and Rice",
    category: "food",
  },
  {
    id: 12,
    src: "/images/food/fresh-fruit-platter.jpg",
    alt: "Fresh Fruit Platter",
    category: "food",
  },
  {
    id: 13,
    src: "/images/food/garden-salad-platter.jpg",
    alt: "Fresh Garden Salad Platter",
    category: "food",
  },
  {
    id: 14,
    src: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    alt: "Full Buffet Spread - Rice, Beans, Empanadas, Chicken",
    category: "events",
  },
  // Chef Yaya Images
  {
    id: 15,
    src: "/images/chef/chef-yaya-outdoor-portrait.jpg",
    alt: "Chef Yaya - Outdoor Portrait",
    category: "chef",
  },
  {
    id: 16,
    src: "/images/chef/chef-yajaira-portrait-black-pink-coat.jpg",
    alt: "Chef Yajaira - Professional Portrait",
    category: "chef",
  },
  {
    id: 17,
    src: "/images/chef/chef-yaya-hall-of-fame-award.jpg",
    alt: "Chef Yaya - Hall of Fame Award Ceremony",
    category: "chef",
  },
  {
    id: 18,
    src: "/images/chef/nbca-awards-2025-promo-chef-yajaira.jpg",
    alt: "NBCA Awards - Chef Yajaira Feature",
    category: "chef",
  },
  {
    id: 19,
    src: "/images/chef/chef-yaya-senator-schumer.jpg",
    alt: "Chef Yaya with Senator Chuck Schumer",
    category: "chef",
  },
  {
    id: 20,
    src: "/images/chef/chef-yaya-mayor-dinkins.jpg",
    alt: "Chef Yaya with Mayor David Dinkins",
    category: "chef",
  },
  {
    id: 21,
    src: "/images/chef/chef-yajaira-avenues-for-justice-feature.jpg",
    alt: "Chef Yajaira - Avenues for Justice Feature",
    category: "events",
  },
  {
    id: 22,
    src: "/images/chef/chef-yaya-nyc-school-event.jpg",
    alt: "Chef Yaya at NYC School Event",
    category: "events",
  },
  {
    id: 23,
    src: "/images/chef/chef-yaya-manhattan-6th-ave.jpg",
    alt: "Chef Yaya in Manhattan",
    category: "chef",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : 0
    );
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : 0
    );
  }, [filteredImages.length]);

  // Properly handle keyboard navigation in useEffect with cleanup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function removes listener when lightbox closes or component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-chamomile">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sage font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              See Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-brown mt-2 mb-6"
            >
              Photo <span className="text-orange">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brown/70 leading-relaxed"
            >
              Browse through our collection of mouthwatering dishes, beautiful
              event setups, and happy celebrations we&apos;ve been part of.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {/* Category Filters with aria-pressed */}
          <div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            role="group"
            aria-label="Filter gallery by category"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={cn(
                  "px-6 py-2 rounded-full font-montserrat text-sm font-medium transition-colors",
                  activeCategory === cat.id
                    ? "bg-sage text-white"
                    : "bg-oat text-brown hover:bg-sage/10"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <button
                    onClick={() => openLightbox(index)}
                    className="relative w-full overflow-hidden rounded-xl group cursor-pointer"
                    aria-label={`View ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={index % 3 === 0 ? 400 : index % 3 === 1 ? 500 : 350}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-montserrat font-medium">
                        View Image
                      </span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 bg-oat">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              In Motion
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-playfair font-bold text-brown mt-2 mb-4"
            >
              Video <span className="text-orange">Showcase</span>
            </motion.h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
              >
                <video
                  className="w-full aspect-video object-cover"
                  poster={video.poster}
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/90 to-transparent p-6 pointer-events-none">
                  <h3 className="text-white font-playfair font-semibold text-lg">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-sm font-montserrat">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain"
              />
              <p className="text-white/70 text-center mt-4 font-montserrat">
                {filteredImages[lightboxIndex].alt}
              </p>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 font-montserrat text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Video Showcase - Social Style */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sage font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              Behind the Scenes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-playfair font-bold text-brown mt-2 mb-4"
            >
              Stories & <span className="text-orange">Reels</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-brown/70 max-w-xl mx-auto"
            >
              Click to expand and watch with sound
            </motion.p>
            <div className="w-16 h-1 bg-gold mx-auto mt-4" />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {verticalVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full max-w-[280px]"
              >
                <VideoModal
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  description={video.description}
                  aspectRatio="vertical"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
