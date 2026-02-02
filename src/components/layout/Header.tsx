"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Simplified nav anchored around 3 key journeys
const PRIMARY_NAV = [
  {
    label: "Plan Event",
    href: "/services",
    children: [
      { label: "Weddings", href: "/services/weddings" },
      { label: "Corporate Events", href: "/services/corporate" },
      { label: "Private Parties", href: "/services/private-parties" },
      { label: "Drop-Off Catering", href: "/services/drop-off" },
    ],
  },
  { label: "Explore Menu", href: "/menu" },
  { label: "See Our Work", href: "/gallery" },
];

// Secondary nav for mobile and footer
const SECONDARY_NAV = [
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="KDS Comfort Food Catering"
              width={140}
              height={140}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "w-16 h-16 md:w-20 md:h-20" : "w-24 h-24 md:w-32 md:h-32"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation - Simplified 3 key journeys */}
          <div className="hidden lg:flex items-center space-x-8">
            {PRIMARY_NAV.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center space-x-1 font-montserrat text-sm font-medium transition-colors",
                        isScrolled
                          ? "text-brown hover:text-orange"
                          : "text-white hover:text-orange drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-cream-200"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-brown hover:bg-cream hover:text-orange transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "font-montserrat text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-brown hover:text-orange"
                        : "text-white hover:text-orange drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Dual CTA Chip - "Book Tasting" + Phone */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Phone Link - Ghost Style */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                isScrolled
                  ? "text-brown hover:bg-brown/5 hover:text-orange"
                  : "text-white/90 hover:bg-white/10 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              )}
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
            >
              <Phone className="w-4 h-4" />
              <span className="font-montserrat text-sm font-medium">
                {SITE_CONFIG.phone}
              </span>
            </a>
            
            {/* Book Tasting - Primary CTA */}
            <Link 
              href="/contact?type=tasting" 
              className="btn-primary text-sm py-2.5 px-5 flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Tasting</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isScrolled
                ? "text-brown hover:text-orange"
                : "text-white hover:text-orange drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu - Lighter expandable pattern */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-cream-200 mt-4 bg-white/95 backdrop-blur-sm rounded-lg px-4">
                {/* Primary Navigation */}
                <div className="space-y-1">
                  <span className="text-xs font-montserrat font-semibold text-brown/50 uppercase tracking-wider px-2">
                    Main
                  </span>
                  {PRIMARY_NAV.map((link) => (
                    <div key={link.label}>
                      {link.children ? (
                        <div className="space-y-1">
                          <span className="block px-2 py-2 font-montserrat font-semibold text-brown">
                            {link.label}
                          </span>
                          <div className="pl-4 space-y-1 border-l-2 border-orange/20 ml-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-2 py-1.5 text-sm text-brown/70 hover:text-orange transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-2 py-2 font-montserrat font-semibold text-brown hover:text-orange transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Secondary Navigation - Collapsed/lighter */}
                <div className="pt-3 border-t border-cream-200 space-y-1">
                  <span className="text-xs font-montserrat font-semibold text-brown/50 uppercase tracking-wider px-2">
                    More
                  </span>
                  <div className="flex flex-wrap gap-2 px-2">
                    {SECONDARY_NAV.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-brown/60 hover:text-orange transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 border-t border-cream-200 space-y-3">
                  <Link
                    href="/contact?type=tasting"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-center flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Tasting</span>
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="btn-ghost w-full text-center flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {SITE_CONFIG.phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
