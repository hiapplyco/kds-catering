"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

interface InlineTestimonialProps {
  testimonialIndex?: number;
  variant?: "light" | "dark";
}

export default function InlineTestimonial({ 
  testimonialIndex = 0,
  variant = "light" 
}: InlineTestimonialProps) {
  const testimonial = TESTIMONIALS[testimonialIndex % TESTIMONIALS.length];
  
  // Truncate quote for inline display
  const shortQuote = testimonial.quote.length > 180 
    ? testimonial.quote.slice(0, 180).trim() + "..."
    : testimonial.quote;

  const bgClass = variant === "light" ? "bg-chamomile" : "bg-brown";
  const textClass = variant === "light" ? "text-brown" : "text-white";
  const mutedTextClass = variant === "light" ? "text-brown/60" : "text-white/70";
  const quoteIconClass = variant === "light" ? "text-sage/30" : "text-gold/30";
  const accentClass = variant === "light" ? "text-sage" : "text-gold";

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative text-center px-8 md:px-16">
            {/* Decorative quotes */}
            <Quote className={`absolute top-0 left-0 w-10 h-10 ${quoteIconClass} hidden md:block`} />
            <Quote className={`absolute bottom-0 right-0 w-10 h-10 ${quoteIconClass} rotate-180 hidden md:block`} />
            
            {/* Rating */}
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-gold" />
              ))}
            </div>

            {/* Quote - Cormorant for pull quote style */}
            <blockquote className={`text-xl md:text-2xl font-cormorant italic ${textClass} leading-relaxed mb-6`}>
              &ldquo;{shortQuote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div>
              <p className={`font-playfair font-semibold ${textClass}`}>
                {testimonial.name}
              </p>
              <p className={`text-sm ${accentClass} font-montserrat`}>
                {testimonial.event}
              </p>
            </div>

            {/* CTA link to full testimonials */}
            <motion.a
              href="/testimonials"
              className={`inline-flex items-center mt-6 text-sm font-montserrat font-medium ${mutedTextClass} hover:${accentClass} transition-colors`}
              whileHover={{ x: 4 }}
            >
              Read more testimonials →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
