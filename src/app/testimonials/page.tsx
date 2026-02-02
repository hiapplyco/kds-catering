"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight, Filter } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { 
  getAggregatedReviews, 
  ReviewsResponse, 
  ReviewSource,
  SOURCE_INFO,
  REVIEW_LINKS 
} from "@/lib/reviews";
import { CTASection } from "@/components/sections";
import { ReviewCard, TestimonialForm } from "@/components/ui";
import { cn } from "@/lib/utils";

type FilterType = "all" | ReviewSource;

export default function TestimonialsPage() {
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getAggregatedReviews(TESTIMONIALS);
        setReviewsData(data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadReviews();
  }, []);

  const filteredReviews = reviewsData?.reviews.filter(
    (r) => activeFilter === "all" || r.source === activeFilter
  ) || [];

  const filterOptions: { id: FilterType; label: string; count: number }[] = [
    { id: "all", label: "All Reviews", count: reviewsData?.totalReviews || 0 },
    { id: "google", label: "Google", count: reviewsData?.reviews.filter(r => r.source === "google").length || 0 },
    { id: "yelp", label: "Yelp", count: reviewsData?.reviews.filter(r => r.source === "yelp").length || 0 },
    { id: "website", label: "Website", count: reviewsData?.reviews.filter(r => r.source === "website").length || 0 },
  ];

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 opacity-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/decorative-salad.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container-custom relative z-10">
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
              Reviews & <span className="text-orange">Testimonials</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-brown/70 leading-relaxed"
            >
              See what our clients are saying across Google, Yelp, and more.
              Real experiences from real customers.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Food Gallery Banner - Infinite Scroll */}
      <section className="py-4 bg-brown overflow-hidden">
        <div className="flex animate-scroll">
          {[
            "/images/food/glazed-salmon-noodles-meal-prep.jpg",
            "/images/food/braised-oxtails.jpg",
            "/images/food/rainbow-vegetable-crudite-platter-hummus.jpg",
            "/images/food/jerk-chicken-rice-peas.jpeg",
            "/images/food/guacamole-bread-cups-edible-flowers.jpg",
            "/images/food/fruit-salad-cups.jpg",
            "/images/food/cookie-brownie-platters-strawberry-roses.jpg",
            "/images/food/roasted-turkey-cranberries-orange-herbs.jpg",
            "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
            "/images/food/fried-chicken-rice-buffet-edible-flowers.jpg",
            // Duplicate for seamless scroll
            "/images/food/glazed-salmon-noodles-meal-prep.jpg",
            "/images/food/braised-oxtails.jpg",
            "/images/food/rainbow-vegetable-crudite-platter-hummus.jpg",
            "/images/food/jerk-chicken-rice-peas.jpeg",
            "/images/food/guacamole-bread-cups-edible-flowers.jpg",
            "/images/food/fruit-salad-cups.jpg",
          ].map((src, i) => (
            <div key={i} className="relative w-48 h-32 flex-shrink-0 mx-2">
              <Image
                src={src}
                alt="KDS Comfort Food dish"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Aggregated Stats Banner */}
      <section className="py-8 bg-orange">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">
                {reviewsData?.aggregatedRating.toFixed(1) || "5.0"}
              </span>
              <span className="text-sm text-white/80 font-montserrat">
                Average Rating
              </span>
            </div>
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">
                {reviewsData?.totalReviews || "0"}+
              </span>
              <span className="text-sm text-white/80 font-montserrat">
                Total Reviews
              </span>
            </div>
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">100%</span>
              <span className="text-sm text-white/80 font-montserrat">
                5-Star Ratings
              </span>
            </div>
            <div className="text-center text-white">
              <span className="block text-4xl font-playfair font-bold">3</span>
              <span className="text-sm text-white/80 font-montserrat">
                Platforms
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid with Filters */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-brown mb-4">
              What People Are <span className="text-orange">Saying</span>
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={cn(
                  "px-4 py-2 rounded-full font-montserrat text-sm font-medium transition-all flex items-center gap-2",
                  activeFilter === option.id
                    ? "bg-orange text-white"
                    : "bg-cream text-brown hover:bg-orange/10"
                )}
              >
                {option.id !== "all" && (
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: SOURCE_INFO[option.id as ReviewSource]?.color }}
                  />
                )}
                {option.label}
                <span className="text-xs opacity-70">({option.count})</span>
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-cream rounded-2xl p-8 animate-pulse">
                  <div className="h-4 bg-brown/20 rounded w-24 mb-4" />
                  <div className="h-3 bg-brown/20 rounded w-32 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-brown/20 rounded" />
                    <div className="h-3 bg-brown/20 rounded" />
                    <div className="h-3 bg-brown/20 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brown/60">No reviews found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Testimonial Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info + Video */}
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-orange font-montserrat font-semibold uppercase tracking-wider text-sm"
              >
                Share Your Story
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-playfair font-bold text-brown mt-2 mb-4"
              >
                Leave a <span className="text-orange">Testimonial</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-brown/70 mb-6"
              >
                Had an amazing experience with Chef Yaya? We&apos;d love to hear 
                about it! Your feedback helps us improve and helps others 
                discover our services.
              </motion.p>

              {/* Video Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <video
                  className="w-full aspect-video object-cover"
                  poster="/images/food/buffet-line-rice-beans-empanadas-chicken.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/catering-trays.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/80 to-transparent p-4">
                  <p className="text-white font-montserrat text-sm">
                    See our catering in action
                  </p>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-white rounded-xl"
              >
                <p className="text-sm text-brown/70 mb-3">
                  Prefer to leave a review on another platform?
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={REVIEW_LINKS.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors text-sm font-medium"
                  >
                    🔍 Google Reviews
                  </a>
                  <a
                    href={REVIEW_LINKS.yelp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D32323] text-white rounded-lg hover:bg-[#AF1D1D] transition-colors text-sm font-medium"
                  >
                    ⭐ Yelp Reviews
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* Featured Chef Image */}
      <section className="py-20 bg-brown">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/chef/chef-yaya-outdoor-portrait.jpg"
                alt="Chef Yaya"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <Quote className="w-12 h-12 text-orange mb-4" />
              <blockquote className="text-2xl md:text-3xl font-playfair italic leading-relaxed mb-6">
                &ldquo;Every dish I create is made with love, because food has 
                the power to bring people together and create lasting memories.&rdquo;
              </blockquote>
              <p className="text-orange font-montserrat font-semibold">
                — Chef Yajaira &quot;Yaya&quot; Springer
              </p>
              <p className="text-white/60 text-sm mt-1">
                National Black Chef&apos;s Association Hall of Fame Recipient
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
