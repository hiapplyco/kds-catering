"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const heroImages = [
  {
    src: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    alt: "Full Buffet Spread",
  },
  {
    src: "/images/food/roasted-turkey-cranberries-orange-herbs.jpg",
    alt: "Roasted Turkey with Herbs",
  },
  {
    src: "/images/food/rainbow-vegetable-crudite-platter-hummus.jpg",
    alt: "Rainbow Vegetable Platter",
  },
  {
    src: "/images/food/guacamole-bread-cups-edible-flowers.jpg",
    alt: "Shrimp Appetizer Cups",
  },
  {
    src: "/images/food/fried-chicken-rice-buffet-edible-flowers.jpg",
    alt: "Fried Chicken Buffet",
  },
  {
    src: "/images/food/glazed-salmon-noodles-meal-prep.jpg",
    alt: "Glazed Salmon",
  },
  {
    src: "/images/food/braised-oxtails.jpg",
    alt: "Braised Oxtails",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rotating Background Images with Ken Burns Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.2 },
              scale: { duration: 6, ease: "linear" }
            }}
            className="absolute inset-0 motion-reduce:scale-100 motion-reduce:transition-none"
          >
            <Image
              src={heroImages[currentIndex].src}
              alt={heroImages[currentIndex].alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Lightened gradient overlay — Brooklyn comfort aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-brown/80 via-brown/60 to-brown/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/40 via-transparent to-brown/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-white/90 text-sm font-montserrat">
              NYC&apos;s Premier Caterer
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-6"
          >
            Comfort & Custom{" "}
            <span className="text-orange">Cuisine</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-opensans leading-relaxed mb-8 max-w-2xl"
          >
            Classic comfort with a contemporary touch. From intimate gatherings
            to grand celebrations, Chef Yaya brings exceptional cuisine to your
            special moments. Premium catering for weddings, corporate events, and private parties.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="btn-primary group"
            >
              <span>Book Your Event</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/menu"
              className="btn-ghost-light"
            >
              Explore Our Menu
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center space-x-8"
          >
            <div className="text-white">
              <span className="text-3xl font-playfair font-bold text-orange">500+</span>
              <span className="block text-sm text-white/70 font-montserrat">
                Events Catered
              </span>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-white">
              <span className="text-3xl font-playfair font-bold text-orange">15+</span>
              <span className="block text-sm text-white/70 font-montserrat">
                Years Experience
              </span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block" />
            <div className="text-white hidden sm:block">
              <span className="text-3xl font-playfair font-bold text-orange">5.0</span>
              <span className="block text-sm text-white/70 font-montserrat">
                Google Rating
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Hero image slides">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
              index === currentIndex 
                ? "bg-orange w-6" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`View slide ${index + 1}: ${heroImages[index].alt}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-orange rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
