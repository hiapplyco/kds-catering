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
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Stats {
  menuItems: number;
  galleryImages: number;
  testimonials: number;
  packages: number;
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
    packages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch counts from Firestore collections
        const [menuSnap, gallerySnap, testimonialsSnap, packagesSnap] =
          await Promise.all([
            getDocs(collection(db, "menuItems")).catch(() => ({ size: 0 })),
            getDocs(collection(db, "gallery")).catch(() => ({ size: 0 })),
            getDocs(collection(db, "testimonials")).catch(() => ({ size: 0 })),
            getDocs(collection(db, "packages")).catch(() => ({ size: 0 })),
          ]);

        setStats({
          menuItems: menuSnap.size || 0,
          galleryImages: gallerySnap.size || 0,
          testimonials: testimonialsSnap.size || 0,
          packages: packagesSnap.size || 0,
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-playfair font-bold text-brown">
          Welcome to Chef&apos;s Kitchen
        </h1>
        <p className="text-brown/60 mt-1 font-montserrat">
          Manage your KDS Comfort Food website content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown/60 text-sm font-montserrat">
                  {stat.label}
                </p>
                <p className="text-3xl font-playfair font-bold text-brown mt-1">
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-playfair font-bold text-brown mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`${action.color} p-3 rounded-lg`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-montserrat font-medium text-brown group-hover:text-orange transition-colors">
                  {action.label}
                </span>
                <ArrowRight className="w-4 h-4 text-brown/30 ml-auto group-hover:text-orange group-hover:translate-x-1 transition-all" />
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
        className="bg-orange/10 border border-orange/20 rounded-xl p-6"
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
