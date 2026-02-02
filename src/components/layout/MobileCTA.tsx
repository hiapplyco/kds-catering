"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, MessageCircle, Utensils } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type CTAContext = "default" | "menu" | "gallery" | "engaged";

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaContext, setCtaContext] = useState<CTAContext>("default");
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Determine context based on page and scroll
  const updateContext = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;
    setScrollProgress(progress);

    // Show after scrolling past hero
    setIsVisible(scrollY > 400);

    // Context-aware CTA logic
    const isMenuPage = pathname === "/menu";
    const isGalleryPage = pathname === "/gallery";
    const hasWatchedVideo = sessionStorage.getItem("kds_video_watched") === "true";
    const isEngaged = progress > 0.5 || hasWatchedVideo;

    if (isMenuPage || isGalleryPage) {
      setCtaContext("menu");
    } else if (isEngaged) {
      setCtaContext("engaged");
    } else {
      setCtaContext("default");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => updateContext();
    window.addEventListener("scroll", handleScroll);
    updateContext(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateContext]);

  // Listen for video watch events
  useEffect(() => {
    const handleVideoWatch = () => {
      sessionStorage.setItem("kds_video_watched", "true");
      updateContext();
    };
    window.addEventListener("kds_video_watched", handleVideoWatch);
    return () => window.removeEventListener("kds_video_watched", handleVideoWatch);
  }, [updateContext]);

  // CTA configurations based on context
  const ctaConfigs = {
    default: {
      primary: {
        href: `tel:${SITE_CONFIG.phone}`,
        icon: Phone,
        label: "Call Now",
        className: "bg-brown text-white",
      },
      secondary: {
        href: "/contact",
        icon: Calendar,
        label: "Book Now",
        className: "bg-orange text-white",
      },
    },
    menu: {
      primary: {
        href: `sms:${SITE_CONFIG.phone}?body=Hi%20Chef%20Yaya!%20I%20have%20a%20question%20about%20the%20menu.`,
        icon: MessageCircle,
        label: "Text Chef Yaya",
        className: "bg-sage text-white",
      },
      secondary: {
        href: "/contact?type=tasting",
        icon: Utensils,
        label: "Book Tasting",
        className: "bg-orange text-white",
      },
    },
    gallery: {
      primary: {
        href: `sms:${SITE_CONFIG.phone}?body=Hi%20Chef%20Yaya!%20I%20saw%20your%20gallery%20and%20would%20love%20to%20learn%20more.`,
        icon: MessageCircle,
        label: "Text Chef Yaya",
        className: "bg-sage text-white",
      },
      secondary: {
        href: "/contact",
        icon: Calendar,
        label: "Get Quote",
        className: "bg-orange text-white",
      },
    },
    engaged: {
      primary: {
        href: "/contact?type=tasting",
        icon: Calendar,
        label: "Book Tasting",
        className: "bg-orange text-white",
      },
      secondary: {
        href: `tel:${SITE_CONFIG.phone}`,
        icon: Phone,
        label: "Call Now",
        className: "bg-brown text-white",
      },
    },
  };

  const config = ctaConfigs[ctaContext];
  const PrimaryIcon = config.primary.icon;
  const SecondaryIcon = config.secondary.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-cream-200 shadow-lg"
        >
          {/* Progress indicator */}
          <div 
            className="absolute top-0 left-0 h-0.5 bg-orange transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
          
          <div className="p-4">
            <div className="flex items-center justify-center space-x-3">
              {/* Primary CTA */}
              {config.primary.href.startsWith("tel:") || config.primary.href.startsWith("sms:") ? (
                <a
                  href={config.primary.href}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-montserrat font-medium text-sm transition-all hover:opacity-90 ${config.primary.className}`}
                >
                  <PrimaryIcon className="w-4 h-4" />
                  <span>{config.primary.label}</span>
                </a>
              ) : (
                <Link
                  href={config.primary.href}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-montserrat font-medium text-sm transition-all hover:opacity-90 ${config.primary.className}`}
                >
                  <PrimaryIcon className="w-4 h-4" />
                  <span>{config.primary.label}</span>
                </Link>
              )}

              {/* Secondary CTA */}
              {config.secondary.href.startsWith("tel:") || config.secondary.href.startsWith("sms:") ? (
                <a
                  href={config.secondary.href}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-montserrat font-medium text-sm transition-all hover:opacity-90 ${config.secondary.className}`}
                >
                  <SecondaryIcon className="w-4 h-4" />
                  <span>{config.secondary.label}</span>
                </a>
              ) : (
                <Link
                  href={config.secondary.href}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-montserrat font-medium text-sm transition-all hover:opacity-90 ${config.secondary.className}`}
                >
                  <SecondaryIcon className="w-4 h-4" />
                  <span>{config.secondary.label}</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
