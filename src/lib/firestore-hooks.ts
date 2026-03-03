"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  QueryConstraint,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Generic hook to subscribe to a Firestore collection with real-time updates.
 * Falls back to provided default data if Firestore is empty or errors.
 */
export function useCollection<T>(
  collectionName: string,
  fallback: T[],
  constraints: QueryConstraint[] = [],
  transform?: (doc: DocumentData & { id: string }) => T
): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setData(fallback);
        } else {
          const docs = snapshot.docs.map((d) => {
            const raw = { id: d.id, ...d.data() } as DocumentData & { id: string };
            return transform ? transform(raw) : (raw as T);
          });
          setData(docs);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`[Firestore] Error reading ${collectionName}:`, error);
        setData(fallback);
        setLoading(false);
      }
    );

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { data, loading };
}

/**
 * Hook to subscribe to a single Firestore document.
 */
export function useDocument<T>(
  collectionName: string,
  docId: string,
  fallback: T
): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, collectionName, docId);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(fallback);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`[Firestore] Error reading ${collectionName}/${docId}:`, error);
        setData(fallback);
        setLoading(false);
      }
    );

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, docId]);

  return { data, loading };
}

// ── Typed hooks for each collection ──

import { TESTIMONIALS, PACKAGE_TIERS, SITE_CONFIG } from "./constants";
import { menuItems as defaultMenuItems } from "@/data/menu";

export interface FirestoreMenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  category: string;
  image?: string;
  dietary?: string[];
  allergens?: string[];
  featured?: boolean;
  popular?: boolean;
  order?: number;
  active?: boolean;
}

export interface FirestoreTestimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
  approved: boolean;
  source?: string;
}

export interface FirestoreGalleryItem {
  id: string;
  url: string;
  alt: string;
  category: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  type?: "image" | "video";
  mediaType?: string;
  thumbnailUrl?: string;
}

export interface FirestorePackage {
  id: string;
  name: string;
  description: string;
  priceRange?: string;
  price?: number;
  features: string[];
  popular?: boolean;
  order?: number;
  serviceType?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description?: string;
  phone: string;
  email: string;
  address: string;
  hours?: string;
  socialMedia: {
    instagram: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface HomepageSettings {
  heroImages?: string[];
  featuredTestimonials?: string[];
  featuredMenuItems?: string[];
}

/**
 * Menu items from Firestore with fallback to hardcoded data
 */
export function useMenuItems() {
  return useCollection<FirestoreMenuItem>(
    "menuItems",
    defaultMenuItems.map((m) => ({
      ...m,
      active: true,
    })),
    [orderBy("order", "asc")],
    (doc) => ({
      id: doc.id,
      name: doc.name || "",
      description: doc.description || "",
      price: doc.price,
      category: doc.category || "",
      image: doc.image,
      dietary: doc.dietary || [],
      featured: doc.featured || false,
      popular: doc.popular || false,
      order: doc.order || 0,
      active: doc.active !== false,
    })
  );
}

/**
 * Approved testimonials from Firestore with fallback
 */
export function useTestimonials() {
  const fallback: FirestoreTestimonial[] = TESTIMONIALS.map((t) => ({
    id: String(t.id),
    name: t.name,
    event: t.event,
    quote: t.quote,
    rating: t.rating,
    date: t.date,
    approved: true,
    source: "website",
  }));

  return useCollection<FirestoreTestimonial>(
    "testimonials",
    fallback,
    [where("approved", "==", true)],
    (doc) => ({
      id: doc.id,
      name: doc.name || "",
      event: doc.event || "",
      quote: doc.quote || doc.text || "",
      rating: doc.rating || 5,
      date: doc.date || "",
      approved: doc.approved || false,
      source: doc.source || "website",
    })
  );
}

/**
 * Gallery items from Firestore with fallback
 */
export function useGallery() {
  return useCollection<FirestoreGalleryItem>(
    "gallery",
    [],
    [],
    (doc) => {
      // Infer type from URL if not explicitly set
      const url = doc.url || "";
      const isVideo = doc.type === "video" || doc.mediaType?.startsWith("video") || /\.(mp4|mov|webm|avi)(\?|$)/i.test(url);
      return {
        id: doc.id,
        url,
        alt: doc.alt || "",
        category: doc.category || "Food",
        featured: doc.featured || false,
        order: doc.order || 0,
        createdAt: doc.createdAt || "",
        type: isVideo ? "video" : "image",
        mediaType: doc.mediaType || "",
        thumbnailUrl: doc.thumbnailUrl || "",
      };
    }
  );
}

/**
 * Catering packages from Firestore with fallback
 */
export function usePackages() {
  const fallback: FirestorePackage[] = PACKAGE_TIERS.map((p) => ({
    ...p,
    order: 0,
    features: p.features,
  }));

  return useCollection<FirestorePackage>(
    "packages",
    fallback,
    [orderBy("order", "asc")],
    (doc) => ({
      id: doc.id,
      name: doc.name || "",
      description: doc.description || "",
      priceRange: doc.priceRange || "",
      price: doc.price,
      features: doc.features || [],
      popular: doc.popular || false,
      order: doc.order || 0,
      serviceType: doc.serviceType || "",
    })
  );
}

/**
 * Site settings from Firestore with fallback
 */
export function useSiteSettings() {
  const fallback: SiteSettings = {
    siteName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    phone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: SITE_CONFIG.address,
    socialMedia: SITE_CONFIG.socialMedia,
  };

  return useDocument<SiteSettings>("settings", "site", fallback);
}

/**
 * Homepage settings from Firestore with fallback
 */
export function useHomepageSettings() {
  const fallback: HomepageSettings = {
    heroImages: [],
    featuredTestimonials: [],
    featuredMenuItems: [],
  };

  return useDocument<HomepageSettings>("settings", "homepage", fallback);
}
