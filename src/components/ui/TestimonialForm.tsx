"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, ExternalLink, CheckCircle } from "lucide-react";
import { REVIEW_LINKS } from "@/lib/reviews";

interface FormData {
  name: string;
  email: string;
  eventType: string;
  rating: number;
  testimonial: string;
}

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Private Party",
  "Community Event",
  "Drop-Off Catering",
  "Other",
];

export default function TestimonialForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    eventType: "",
    rating: 5,
    testimonial: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect to API endpoint when backend is ready
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Testimonial submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cream rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-playfair font-bold text-brown mb-2">
          Thank You!
        </h3>
        <p className="text-brown/70 mb-6">
          Your testimonial has been submitted and will be reviewed shortly.
        </p>

        {/* Prompt to leave external reviews */}
        <div className="bg-white rounded-xl p-6 text-left">
          <p className="text-sm text-brown/70 mb-4 text-center">
            Help others discover Chef Yaya! Consider leaving a review on:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REVIEW_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-colors text-sm font-medium"
            >
              <span>🔍</span>
              Review on Google
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={REVIEW_LINKS.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#D32323] text-white rounded-lg hover:bg-[#AF1D1D] transition-colors text-sm font-medium"
            >
              <span>⭐</span>
              Review on Yelp
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              eventType: "",
              rating: 5,
              testimonial: "",
            });
          }}
          className="mt-6 text-orange hover:text-orange/80 font-medium text-sm"
        >
          Submit Another Testimonial
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-cream rounded-2xl p-6 md:p-8"
    >
      <h3 className="text-2xl font-playfair font-bold text-brown mb-2">
        Share Your Experience
      </h3>
      <p className="text-brown/70 mb-6 text-sm">
        We&apos;d love to hear about your experience with KDS Comfort Food!
      </p>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-montserrat font-medium text-brown mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-montserrat font-medium text-brown mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-montserrat font-medium text-brown mb-1">
            Event Type *
          </label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-colors bg-white"
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-montserrat font-medium text-brown mb-2">
            Your Rating *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || formData.rating)
                      ? "text-gold fill-gold"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div>
          <label className="block text-sm font-montserrat font-medium text-brown mb-1">
            Your Testimonial *
          </label>
          <textarea
            required
            rows={4}
            value={formData.testimonial}
            onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-colors resize-none"
            placeholder="Tell us about your experience with Chef Yaya and KDS Comfort Food..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Testimonial
            </>
          )}
        </button>
      </div>

      {/* External Review Links */}
      <div className="mt-6 pt-6 border-t border-brown/10">
        <p className="text-xs text-brown/60 text-center mb-3">
          You can also leave a review directly on:
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={REVIEW_LINKS.google}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#4285F4] hover:underline flex items-center gap-1"
          >
            🔍 Google
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={REVIEW_LINKS.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#D32323] hover:underline flex items-center gap-1"
          >
            ⭐ Yelp
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.form>
  );
}
