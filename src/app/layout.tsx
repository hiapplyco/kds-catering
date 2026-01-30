import type { Metadata } from "next";
import { Header, Footer, MobileCTA } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KD's Comfort Food | Premium Soul Food Catering in NYC",
    template: "%s | KD's Comfort Food",
  },
  description:
    "Premium soul-food catering for weddings, corporate events, and private parties in NYC and the Tri-State area. Authentic Southern comfort cuisine made with love.",
  keywords: [
    "catering",
    "soul food",
    "comfort food",
    "NYC catering",
    "wedding catering",
    "corporate catering",
    "private party catering",
    "Southern food",
    "Tri-State catering",
  ],
  authors: [{ name: "KD's Comfort Food" }],
  creator: "KD's Comfort Food",
  publisher: "KD's Comfort Food",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kdscatering.web.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "KD's Comfort Food | Premium Soul Food Catering",
    description:
      "Premium soul-food catering for weddings, corporate events, and private parties in NYC and the Tri-State area.",
    url: "https://kdscatering.web.app",
    siteName: "KD's Comfort Food",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "KD's Comfort Food Catering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KD's Comfort Food | Premium Soul Food Catering",
    description:
      "Premium soul-food catering for weddings, corporate events, and private parties in NYC.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Schema for Local Business and Caterer
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "FoodEstablishment"],
      "@id": "https://kdscatering.web.app/#business",
      name: "KD's Comfort Food",
      description:
        "Premium soul-food catering for weddings, corporate events, and private parties in NYC and the Tri-State area.",
      url: "https://kdscatering.web.app",
      telephone: "(555) 123-4567",
      email: "info@kdscatering.web.app",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main Street",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.006,
      },
      servesCuisine: ["Soul Food", "Southern", "American"],
      priceRange: "$$-$$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      sameAs: [
        "https://instagram.com/kdscomfortfood",
        "https://facebook.com/kdscomfortfood",
        "https://twitter.com/kdscomfortfood",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kdscatering.web.app/#website",
      url: "https://kdscatering.web.app",
      name: "KD's Comfort Food",
      publisher: {
        "@id": "https://kdscatering.web.app/#business",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
