"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ExternalLink,
  Copy,
  Check,
  Globe,
  BarChart3,
} from "lucide-react";
import {
  getAggregatedReviews,
  REVIEW_LINKS,
  SOURCE_INFO,
  type ReviewsResponse,
  type ReviewSource,
} from "@/lib/reviews";

type FilterSource = "all" | ReviewSource;

export default function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterSource>("all");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getAggregatedReviews();
        setReviewsData(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const filteredReviews = reviewsData?.reviews.filter(
    (r) => filter === "all" || r.source === filter
  ) ?? [];

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(key);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!reviewsData) {
    return (
      <div className="text-center py-12">
        <p className="text-brown/60 font-montserrat">Unable to load reviews.</p>
      </div>
    );
  }

  const maxRatingCount = Math.max(...Object.values(reviewsData.ratingDistribution), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-brown">
          Reviews & Ratings
        </h1>
        <p className="text-brown/60 mt-1 font-montserrat">
          See what customers are saying across all platforms
        </p>
      </div>

      {/* Aggregated Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm text-center"
        >
          <div className="text-4xl font-playfair font-bold text-brown mb-2">
            {reviewsData.aggregatedRating}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(reviewsData.aggregatedRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-brown/60 font-montserrat">
            Based on {reviewsData.totalReviews} reviews
          </p>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-sm font-montserrat font-medium text-brown mb-3">
            Rating Distribution
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviewsData.ratingDistribution[rating] || 0;
              const pct = (count / maxRatingCount) * 100;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs font-montserrat text-brown/60 w-3">
                    {rating}
                  </span>
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-cream rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-montserrat text-brown/40 w-4 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Sources Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-sm font-montserrat font-medium text-brown mb-3">
            Review Sources
          </h3>
          <div className="space-y-3">
            {(["google", "yelp", "website"] as const).map((source) => {
              const count = reviewsData.reviews.filter(
                (r) => r.source === source
              ).length;
              const info = SOURCE_INFO[source];
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      {info.icon}
                    </span>
                    <span className="text-sm font-montserrat text-brown">
                      {info.name}
                    </span>
                  </div>
                  <span className="text-sm font-montserrat font-medium text-brown">
                    {count} reviews
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Source Connection Status */}
      <div className="bg-orange/10 border border-orange/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-montserrat text-brown/70">
              <strong>Review Sources:</strong> Currently showing sample data for
              Google and Yelp reviews. To connect real review APIs, contact your
              developer with your Google Business and Yelp Business credentials.
            </p>
          </div>
        </div>
      </div>

      {/* Review Links — Ask for Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-playfair font-bold text-brown mb-1">
          Ask for Reviews
        </h2>
        <p className="text-sm text-brown/60 font-montserrat mb-4">
          Share these links with customers to collect reviews
        </p>
        <div className="space-y-3">
          {(
            [
              { key: "google", label: "Google", url: REVIEW_LINKS.google },
              { key: "yelp", label: "Yelp", url: REVIEW_LINKS.yelp },
              { key: "facebook", label: "Facebook", url: REVIEW_LINKS.facebook },
            ] as const
          ).map((link) => (
            <div
              key={link.key}
              className="flex items-center gap-3 p-3 bg-cream rounded-lg"
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: `${SOURCE_INFO[link.key === "facebook" ? "facebook" : link.key].color}15` }}
              >
                {SOURCE_INFO[link.key === "facebook" ? "facebook" : link.key].icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-montserrat font-medium text-brown">
                  {link.label}
                </p>
                <p className="text-xs text-brown/40 font-mono truncate">
                  {link.url}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(link.url, link.key)}
                  className="p-2 rounded-lg hover:bg-brown/5 transition-colors"
                  title="Copy link"
                >
                  {copiedLink === link.key ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-brown/40" />
                  )}
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-brown/5 transition-colors"
                  title="Open link"
                >
                  <ExternalLink className="w-4 h-4 text-brown/40" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reviews Feed */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl font-playfair font-bold text-brown">
            All Reviews
          </h2>
          <div className="flex gap-2">
            {(
              [
                { key: "all" as FilterSource, label: "All" },
                { key: "google" as FilterSource, label: "Google" },
                { key: "yelp" as FilterSource, label: "Yelp" },
                { key: "website" as FilterSource, label: "Website" },
              ]
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1 rounded-full text-sm font-montserrat transition-colors ${
                  filter === f.key
                    ? "bg-orange text-white"
                    : "bg-cream text-brown hover:bg-orange/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <BarChart3 className="w-12 h-12 text-brown/20 mx-auto mb-4" />
            <p className="text-brown/60 font-montserrat">
              No reviews found for this filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const info = SOURCE_INFO[review.source];
              return (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-montserrat font-medium"
                        style={{
                          backgroundColor: `${info.color}15`,
                          color: info.color,
                        }}
                      >
                        {info.icon} {info.name}
                      </span>
                      <h3 className="font-playfair font-bold text-brown">
                        {review.authorName}
                      </h3>
                      {review.verified && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-brown/70 text-sm leading-relaxed mb-3">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-brown/40 font-montserrat">
                    <span>{review.date}</span>
                    {review.relativeTime && <span>{review.relativeTime}</span>}
                    {review.eventType && (
                      <span className="px-2 py-0.5 bg-cream rounded-full">
                        {review.eventType}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
