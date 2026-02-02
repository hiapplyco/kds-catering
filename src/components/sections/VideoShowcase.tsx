"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { VideoModal } from "@/components/ui";

const showcaseVideos = [
  {
    id: 1,
    src: "/videos/roasted-turkey.mp4",
    poster: "/images/food/roasted-turkey-cranberries-orange-herbs.jpg",
    title: "Holiday Roasted Turkey",
    description: "Perfectly seasoned with fresh herbs",
    orientation: "vertical" as const,
  },
  {
    id: 2,
    src: "/videos/decorative-salad.mp4",
    poster: "/images/food/rainbow-vegetable-crudite-platter-hummus.jpg",
    title: "Artisan Salad Presentation",
    description: "Fresh & beautifully arranged",
    orientation: "vertical" as const,
  },
  {
    id: 3,
    src: "/videos/mashed-potatoes-mac-cheese-vertical.mp4",
    poster: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    title: "Comfort Food Classics",
    description: "Creamy mashed potatoes & mac and cheese",
    orientation: "vertical" as const,
  },
];

export default function VideoShowcase() {
  return (
    <section className="py-24 bg-brown overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-persimmon font-montserrat font-semibold uppercase tracking-wider text-sm"
          >
            See Our Food in Action
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-white mt-2 mb-4"
          >
            Video <span className="text-orange">Showcase</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-xl mx-auto"
          >
            Watch our delicious dishes come to life. <span className="text-persimmon">Tap for audio.</span>
          </motion.p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4" />
        </div>

        {/* Video Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {showcaseVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="w-full max-w-[280px] md:max-w-[300px]"
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-persimmon hover:text-orange font-montserrat font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            View More in Our Gallery
          </a>
        </motion.div>
      </div>
    </section>
  );
}
