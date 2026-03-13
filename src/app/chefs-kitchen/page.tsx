"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Image as ImageIcon,
  Star,
  DollarSign,
  ArrowRight,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAggregatedReviews, type ReviewsResponse, SOURCE_INFO } from "@/lib/reviews";

interface Stats {
  menuItems: number;
  galleryImages: number;
  testimonials: number;
  pendingTestimonials: number;
  packages: number;
  reviews: ReviewsResponse | null;
}

const quickActions = [
  {
    label: "Add Menu Item",
    href: "/chefs-kitchen/menu?action=new",
    icon: UtensilsCrossed,
    color: "bg-blue-500",
  },
  {
    label: "Upload Photos",
    href: "/chefs-kitchen/gallery?action=upload",
    icon: ImageIcon,
    color: "bg-green-500",
  },
  {
    label: "Manage Reviews",
    href: "/chefs-kitchen/testimonials",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    label: "Update Pricing",
    href: "/chefs-kitchen/pricing",
    icon: DollarSign,
    color: "bg-purple-500",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    menuItems: 0,
    galleryImages: 0,
    testimonials: 0,
    pendingTestimonials: 0,
    packages: 0,
    reviews: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [menuSnap, gallerySnap, testimonialsSnap, packagesSnap, reviewsData] =
          await Promise.all([
            getDocs(collection(db, "menuItems")).catch(() => ({ size: 0, docs: [] })),
            getDocs(collection(db, "gallery")).catch(() => ({ size: 0, docs: [] })),
            getDocs(collection(db, "testimonials")).catch(() => ({ size: 0, docs: [] })),
            getDocs(collection(db, "packages")).catch(() => ({ size: 0, docs: [] })),
            getAggregatedReviews().catch(() => null),
          ]);

        const docs = "docs" in testimonialsSnap ? testimonialsSnap.docs : [];
        const pendingCount = docs.filter(
          (d) => d.data && d.data().approved === false
        ).length;

        setStats({
          menuItems: menuSnap.size || 0,
          galleryImages: gallerySnap.size || 0,
          testimonials: testimonialsSnap.size || 0,
          pendingTestimonials: pendingCount,
          packages: packagesSnap.size || 0,
          reviews: reviewsData,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-brown">
          Welcome to Chef&apos;s Kitchen
        </h1>
        <p className="text-brown/60 mt-1 font-montserrat">
          Manage your KDS Comfort Food website content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          {
            label: "Menu Items",
            value: stats.menuItems,
            icon: UtensilsCrossed,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Gallery Photos",
            value: stats.galleryImages,
            icon: ImageIcon,
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            label: "Testimonials",
            value: stats.testimonials,
            icon: Star,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
          },
          {
            label: "Packages",
            value: stats.packages,
            icon: DollarSign,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown/60 text-xs sm:text-sm font-montserrat">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-playfair font-bold text-brown mt-1">
                  {loading ? "—" : stat.value}
                </p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pending Testimonials Alert */}
      {!loading && stats.pendingTestimonials > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/chefs-kitchen/testimonials"
            className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:bg-yellow-100 transition-colors"
          >
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <span className="font-montserrat text-sm text-yellow-800">
              <strong>{stats.pendingTestimonials}</strong> testimonial{stats.pendingTestimonials !== 1 ? "s" : ""} pending approval
            </span>
            <ArrowRight className="w-4 h-4 text-yellow-600 ml-auto" />
          </Link>
        </motion.div>
      )}

      {/* Reviews Overview */}
      {!loading && stats.reviews && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 sm:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-playfair font-bold text-brown flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange" />
              Reviews Overview
            </h2>
            <Link
              href="/chefs-kitchen/reviews"
              className="text-sm text-orange hover:underline font-montserrat"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-cream rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-playfair font-bold text-brown">
                  {stats.reviews.aggregatedRating}
                </span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-sm text-brown/60 font-montserrat">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-cream rounded-lg">
              <p className="text-2xl font-playfair font-bold text-brown">
                {stats.reviews.totalReviews}
              </p>
              <p className="text-sm text-brown/60 font-montserrat">Total Reviews</p>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <p className="text-sm text-brown/60 font-montserrat mb-2">By Source</p>
              <div className="flex flex-wrap gap-2">
                {(["google", "yelp", "website"] as const).map((source) => {
                  const count = stats.reviews!.reviews.filter(
                    (r) => r.source === source
                  ).length;
                  if (count === 0) return null;
                  return (
                    <span
                      key={source}
                      className="text-xs font-montserrat px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${SOURCE_INFO[source].color}20`, color: SOURCE_INFO[source].color }}
                    >
                      {SOURCE_INFO[source].icon} {SOURCE_INFO[source].name}: {count}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl font-playfair font-bold text-brown mb-3 sm:mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow group text-center sm:text-left"
              >
                <div className={`${action.color} p-2.5 sm:p-3 rounded-lg`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-montserrat font-medium text-xs sm:text-sm text-brown group-hover:text-orange transition-colors">
                  {action.label}
                </span>
                <ArrowRight className="w-4 h-4 text-brown/30 ml-auto group-hover:text-orange group-hover:translate-x-1 transition-all hidden sm:block" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Getting Started Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-orange/10 border border-orange/20 rounded-xl p-4 sm:p-6"
      >
        <h2 className="text-xl font-playfair font-bold text-brown mb-2">
          Getting Started
        </h2>
        <p className="text-brown/70 font-montserrat mb-4">
          Your admin panel is ready! Here&apos;s how to customize your website:
        </p>
        <ul className="space-y-2 text-brown/70 font-montserrat text-sm">
          <li className="flex items-start gap-2">
            <span className="text-orange font-bold">1.</span>
            <span>
              <strong>Menu Items:</strong> Add, edit, or remove dishes from your
              catering menu
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange font-bold">2.</span>
            <span>
              <strong>Gallery:</strong> Upload photos of your dishes and events
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange font-bold">3.</span>
            <span>
              <strong>Testimonials:</strong> Manage and approve customer reviews
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange font-bold">4.</span>
            <span>
              <strong>Pricing:</strong> Update your catering packages and prices
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
