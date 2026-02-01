"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { Review, SOURCE_INFO } from "@/lib/reviews";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  const sourceInfo = SOURCE_INFO[review.source];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-cream rounded-2xl p-6 md:p-8 relative h-full flex flex-col"
    >
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-orange/20" />

      {/* Source Badge */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-montserrat font-medium text-white"
          style={{ backgroundColor: sourceInfo.color }}
        >
          <span>{sourceInfo.icon}</span>
          <span>{sourceInfo.name}</span>
          {review.verified && (
            <span className="ml-1">✓</span>
          )}
        </div>
        {review.relativeTime && (
          <span className="text-xs text-brown/50 font-montserrat">
            {review.relativeTime}
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "text-gold fill-gold"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-brown/80 leading-relaxed mb-6 italic flex-grow text-sm md:text-base">
        &ldquo;{review.text.length > 300 
          ? `${review.text.slice(0, 300)}...` 
          : review.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-brown/10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center mr-3">
            <span className="font-playfair font-bold text-orange">
              {review.authorName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-playfair font-semibold text-brown text-sm">
              {review.authorName}
            </p>
            {review.eventType && (
              <p className="text-xs text-orange">{review.eventType}</p>
            )}
          </div>
        </div>
        
        {review.profileUrl && (
          <a
            href={review.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown/40 hover:text-brown/60 transition-colors"
            aria-label={`View on ${sourceInfo.name}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
