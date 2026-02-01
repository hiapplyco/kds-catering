/**
 * Reviews Aggregation Service
 * 
 * Architecture ready for Google Places API and Yelp Fusion API integration.
 * Currently uses mock data - replace with real API calls when keys are available.
 * 
 * To enable real APIs:
 * 1. Set GOOGLE_PLACES_API_KEY in .env.local
 * 2. Set YELP_API_KEY in .env.local
 * 3. Uncomment the real API fetch functions
 */

export type ReviewSource = "google" | "yelp" | "website" | "facebook";

export interface Review {
  id: string;
  source: ReviewSource;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  text: string;
  date: string;
  relativeTime?: string;
  eventType?: string;
  verified?: boolean;
  profileUrl?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  aggregatedRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
  lastUpdated: string;
}

// Google Places API Configuration
const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "YOUR_PLACE_ID";
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Yelp Fusion API Configuration  
const YELP_BUSINESS_ID = process.env.NEXT_PUBLIC_YELP_BUSINESS_ID || "kds-comfort-food-brooklyn";
const YELP_API_KEY = process.env.YELP_API_KEY;

/**
 * Mock Google Reviews - Replace with real API when key is available
 */
const mockGoogleReviews: Review[] = [
  {
    id: "g1",
    source: "google",
    authorName: "Maria Rodriguez",
    rating: 5,
    text: "Chef Yaya catered our company holiday party and it was absolutely phenomenal! The braised oxtails were to die for, and everyone loved the mac and cheese. Professional service from start to finish.",
    date: "2025-01-15",
    relativeTime: "2 weeks ago",
    verified: true,
  },
  {
    id: "g2",
    source: "google",
    authorName: "James Thompson",
    rating: 5,
    text: "We hired KDS Comfort Food for our wedding and couldn't be happier. The food was incredible, the presentation was beautiful, and Chef Yaya worked with us to create a custom menu that our guests are still talking about!",
    date: "2024-12-20",
    relativeTime: "1 month ago",
    verified: true,
  },
  {
    id: "g3",
    source: "google",
    authorName: "Linda Chen",
    rating: 5,
    text: "Ordered catering for a birthday party. The jerk chicken and rice & peas were authentic and delicious. Delivery was on time and the staff was very professional. Highly recommend!",
    date: "2024-11-28",
    relativeTime: "2 months ago",
    verified: true,
  },
  {
    id: "g4",
    source: "google",
    authorName: "Robert Williams",
    rating: 5,
    text: "Best catering service in Brooklyn! Chef Yaya's attention to detail is unmatched. The food is always fresh, flavorful, and beautifully presented. A true gem!",
    date: "2024-10-15",
    relativeTime: "3 months ago",
    verified: true,
  },
];

/**
 * Mock Yelp Reviews - Replace with real API when key is available
 */
const mockYelpReviews: Review[] = [
  {
    id: "y1",
    source: "yelp",
    authorName: "Tanya B.",
    rating: 5,
    text: "OMG! The food from KDS Comfort Food is AMAZING! We had them cater our family reunion and everyone was asking for Chef Yaya's contact info. The banana pudding was heavenly! Will definitely use again.",
    date: "2025-01-10",
    relativeTime: "3 weeks ago",
    profileUrl: "https://yelp.com",
  },
  {
    id: "y2",
    source: "yelp",
    authorName: "Michael D.",
    rating: 5,
    text: "Professional, delicious, and affordable! Had them cater our office lunch meeting and everyone was impressed. The portions were generous and the flavors were on point. Five stars all the way!",
    date: "2024-12-05",
    relativeTime: "2 months ago",
    profileUrl: "https://yelp.com",
  },
  {
    id: "y3",
    source: "yelp",
    authorName: "Patricia M.",
    rating: 5,
    text: "Chef Yaya is the real deal! Her comfort food reminds me of my grandmother's cooking but elevated. The creamed spinach and salmon were incredible. Definitely my go-to caterer from now on.",
    date: "2024-11-20",
    relativeTime: "2 months ago",
    profileUrl: "https://yelp.com",
  },
];

/**
 * Convert local testimonials to Review format
 */
export function convertTestimonialsToReviews(testimonials: Array<{
  id: number;
  name: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
}>): Review[] {
  return testimonials.map((t) => ({
    id: `local-${t.id}`,
    source: "website" as ReviewSource,
    authorName: t.name,
    rating: t.rating,
    text: t.quote,
    date: t.date,
    eventType: t.event,
    verified: true,
  }));
}

/**
 * Fetch Google Reviews
 * TODO: Implement when GOOGLE_PLACES_API_KEY is available
 */
async function fetchGoogleReviews(): Promise<Review[]> {
  if (!GOOGLE_API_KEY) {
    console.log("[Reviews] Google API key not configured, using mock data");
    return mockGoogleReviews;
  }

  // Real implementation:
  // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`;
  // const response = await fetch(url);
  // const data = await response.json();
  // return data.result.reviews.map(transformGoogleReview);
  
  return mockGoogleReviews;
}

/**
 * Fetch Yelp Reviews
 * TODO: Implement when YELP_API_KEY is available
 */
async function fetchYelpReviews(): Promise<Review[]> {
  if (!YELP_API_KEY) {
    console.log("[Reviews] Yelp API key not configured, using mock data");
    return mockYelpReviews;
  }

  // Real implementation:
  // const url = `https://api.yelp.com/v3/businesses/${YELP_BUSINESS_ID}/reviews`;
  // const response = await fetch(url, {
  //   headers: { Authorization: `Bearer ${YELP_API_KEY}` }
  // });
  // const data = await response.json();
  // return data.reviews.map(transformYelpReview);
  
  return mockYelpReviews;
}

/**
 * Aggregate all reviews from all sources
 */
export async function getAggregatedReviews(localTestimonials?: Array<{
  id: number;
  name: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
}>): Promise<ReviewsResponse> {
  const [googleReviews, yelpReviews] = await Promise.all([
    fetchGoogleReviews(),
    fetchYelpReviews(),
  ]);

  const websiteReviews = localTestimonials 
    ? convertTestimonialsToReviews(localTestimonials)
    : [];

  const allReviews = [...googleReviews, ...yelpReviews, ...websiteReviews];
  
  // Sort by date (newest first)
  allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate aggregated rating
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const aggregatedRating = allReviews.length > 0 
    ? Math.round((totalRating / allReviews.length) * 10) / 10 
    : 0;

  // Calculate rating distribution
  const ratingDistribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allReviews.forEach((r) => {
    ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
  });

  return {
    reviews: allReviews,
    aggregatedRating,
    totalReviews: allReviews.length,
    ratingDistribution,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get reviews by source
 */
export async function getReviewsBySource(source: ReviewSource): Promise<Review[]> {
  const allReviews = await getAggregatedReviews();
  return allReviews.reviews.filter((r) => r.source === source);
}

/**
 * External review links - prompt users to leave reviews
 */
export const REVIEW_LINKS = {
  google: `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`,
  yelp: `https://www.yelp.com/writeareview/biz/${YELP_BUSINESS_ID}`,
  facebook: "https://facebook.com/kdscomfortfood/reviews",
};

/**
 * Source display info
 */
export const SOURCE_INFO: Record<ReviewSource, { name: string; color: string; icon: string }> = {
  google: { name: "Google", color: "#4285F4", icon: "🔍" },
  yelp: { name: "Yelp", color: "#D32323", icon: "⭐" },
  website: { name: "KDS Website", color: "#D2691E", icon: "🍽️" },
  facebook: { name: "Facebook", color: "#1877F2", icon: "👍" },
};
