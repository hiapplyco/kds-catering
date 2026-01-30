"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { CTASection } from "@/components/sections";

// Use real testimonials from constants

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
            >
              Happy Clients
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-brown mt-2 mb-6"
            >
              What People <span className="text-orange">Say</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brown/70 leading-relaxed"
            >
              Don&apos;t just take our word for it. Here&apos;s what our clients have
              to say about their experience with Chef Yaya and KDS Comfort Food.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-orange">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">500+</span>
              <span className="text-sm text-white/80 font-montserrat">
                Happy Events
              </span>
            </div>
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">5.0</span>
              <span className="text-sm text-white/80 font-montserrat">
                Average Rating
              </span>
            </div>
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">98%</span>
              <span className="text-sm text-white/80 font-montserrat">
                Would Recommend
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-2xl p-8 relative"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-orange/20" />

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-brown/80 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center mr-4">
                    <span className="font-playfair font-bold text-orange text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-playfair font-semibold text-brown">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-orange">{testimonial.event}</p>
                    <p className="text-xs text-brown/50">{testimonial.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-playfair font-bold text-brown mb-4">
              See More Reviews
            </h2>
            <p className="text-brown/70 mb-6">
              Check out our Google reviews to see what more clients are saying
              about their experience with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://google.com/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Google Reviews
              </a>
              <Link href="/contact" className="btn-secondary">
                Book Your Event
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
