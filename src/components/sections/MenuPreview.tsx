"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const featuredItems = [
  {
    name: "Pan-Seared Salmon",
    description: "Butter garlic glazed salmon with creamy mash and tender asparagus",
    image: "/images/food/grilled-salmon-mash-asparagus.jpg",
    category: "Entrées",
  },
  {
    name: "Braised Oxtails",
    description: "Slow-braised Caribbean oxtails in rich brown gravy with butter beans",
    image: "/images/food/braised-oxtails.jpg",
    category: "Entrées",
  },
  {
    name: "Guacamole Cups",
    description: "Fresh guacamole in artisan bread cups with beautiful edible flower garnish",
    image: "/images/food/guacamole-bread-cups-edible-flowers.jpg",
    category: "Appetizers",
  },
  {
    name: "Charcuterie & Fruit Board",
    description: "Premium meats, cheeses, fresh berries, and seasonal fruits beautifully arranged",
    image: "/images/food/charcuterie-fruit-board.jpg",
    category: "Platters",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
          >
            Taste the Comfort
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-heading mt-2"
          >
            Featured Menu Items
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="gold-divider"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="section-subheading"
          >
            A preview of our most loved dishes. Every bite tells a story of
            tradition, love, and quality ingredients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-orange text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="font-playfair font-semibold text-lg text-brown mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-brown/60">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/menu" className="btn-primary group">
            <span>View Full Menu</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
