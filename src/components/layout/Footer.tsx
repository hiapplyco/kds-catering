"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useSiteSettings } from "@/lib/firestore-hooks";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: siteConfig } = useSiteSettings();

  return (
    <footer className="bg-brown text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="KDS Comfort Food Catering"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.filter((link) => !link.children).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-gold">
              Our Services
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.find((link) => link.label === "Services")?.children?.map(
                (service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className="text-white/70 hover:text-orange transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-gold">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center space-x-3 text-white/70 hover:text-orange transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-orange" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center space-x-3 text-white/70 hover:text-orange transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-orange" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-white/70 text-sm">
                  <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
