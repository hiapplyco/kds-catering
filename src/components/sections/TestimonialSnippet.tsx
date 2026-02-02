"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Link from "next/link";

// Featured testimonial for inline display
const featuredTestimonial = {
  quote: "Chef Yaya transformed our wedding reception into an unforgettable culinary experience. Every dish was perfection.",
  name: "Sarah & Michael",
  event: "Brooklyn Wedding, October 2025",
  rating: 5,
};

export default function TestimonialSnippet() {
  return (
    <section className="py-16 bg-chamomile">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Quote Icon */}
          <Quote className="w-10 h-10 text-sage mx-auto mb-4 opacity-60" />
          
          {/* Rating */}
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(featuredTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gold fill-gold" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl text-brown/80 font-cormorant italic leading-relaxed mb-6">
            &ldquo;{featuredTestimonial.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <p className="font-playfair font-semibold text-brown">
            {featuredTestimonial.name}
          </p>
          <p className="text-persimmon font-montserrat text-sm mb-6">
            {featuredTestimonial.event}
          </p>

          {/* CTA */}
          <Link 
            href="/testimonials"
            className="text-sage hover:text-sage-600 font-montserrat text-sm font-medium underline underline-offset-4 transition-colors"
          >
            Read more stories →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
