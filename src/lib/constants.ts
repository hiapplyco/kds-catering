// Site Configuration
export const SITE_CONFIG = {
  name: "KDS Comfort Food",
  tagline: "NYC's Premier Caterer Specializing in Comfort & Custom Cuisine",
  description:
    "Classic comfort with a contemporary touch. Premium catering for weddings, corporate events, community gatherings, and private parties in NYC and the Tri-State area.",
  phone: "(516) 246-3030",
  email: "chefyaya@kdscomfortfood.com",
  address: "Brooklyn, New York",
  socialMedia: {
    instagram: "https://instagram.com/kdscomfortfood",
    facebook: "https://facebook.com/kdscomfortfood",
    twitter: "https://twitter.com/kdscomfortfood",
  },
};

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Weddings", href: "/services/weddings" },
      { label: "Corporate Events", href: "/services/corporate" },
      { label: "Private Parties", href: "/services/private-parties" },
      { label: "Drop-Off Catering", href: "/services/drop-off" },
    ],
  },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Services Data
export const SERVICES = [
  {
    id: "weddings",
    title: "Weddings",
    shortDescription: "Make your special day unforgettable with our custom wedding catering.",
    description:
      "From intimate ceremonies to grand celebrations, Chef Yaya brings warmth and flavor to your wedding day. Our experienced team handles everything from menu planning to service, ensuring your guests experience classic comfort with a contemporary touch.",
    image: "/images/food/cookie-brownie-platters-strawberry-roses.jpg",
    features: [
      "Custom menu planning",
      "Professional service staff",
      "Setup and cleanup included",
      "Tastings available",
      "Dietary accommodations",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    shortDescription: "Impress clients and energize your team with premium catering.",
    description:
      "Elevate your business gatherings with our professional corporate catering services. Whether it's a board meeting, company celebration, or client appreciation event, we deliver exceptional food and service that reflects your company's standards.",
    image: "/images/food/boxed-lunches-sandwich-pasta-cookies.jpg",
    features: [
      "Flexible scheduling",
      "Volume pricing available",
      "Professional presentation",
      "On-time delivery guaranteed",
      "Account management",
    ],
  },
  {
    id: "private-parties",
    title: "Private Parties",
    shortDescription: "Celebrate life's moments with food that brings people together.",
    description:
      "Birthday parties, anniversaries, family reunions, and more. We help you create memorable gatherings with delicious cuisine that your guests will rave about. Let us handle the cooking while you enjoy the celebration.",
    image: "/images/food/guacamole-bread-cups-edible-flowers.jpg",
    features: [
      "Customizable menus",
      "Full-service or drop-off options",
      "Party planning assistance",
      "Special occasion packages",
      "Kid-friendly options",
    ],
  },
  {
    id: "community",
    title: "Community Events",
    shortDescription: "Trusted partner for community gatherings and nonprofit events.",
    description:
      "KDS Comfort Food has been an exceptional food vendor for community organizations, domestic violence awareness programs, youth initiatives, and senior social events. Chef Yaya consistently demonstrates professionalism, reliability, and care in every aspect of service.",
    image: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
    features: [
      "Nonprofit-friendly pricing",
      "Large-scale event experience",
      "On-time delivery guaranteed",
      "Professional presentation",
      "Community-focused service",
    ],
  },
];

// Menu Categories
export const MENU_CATEGORIES = [
  { id: "breakfast", name: "Breakfast" },
  { id: "appetizers", name: "Appetizers" },
  { id: "entrees", name: "Entrées" },
  { id: "sides", name: "Sides" },
  { id: "platters", name: "Platters" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

// Dietary Filters
export const DIETARY_FILTERS = [
  { id: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
];

// Package Tiers
export const PACKAGE_TIERS = [
  {
    id: "bronze",
    name: "Bronze",
    description: "Essential comfort food favorites",
    priceRange: "Starting at $35/person",
    features: [
      "2 entrées",
      "3 sides",
      "Bread service",
      "Disposable serviceware",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    description: "Elevated dining experience",
    priceRange: "Starting at $55/person",
    features: [
      "3 entrées",
      "4 sides",
      "Appetizer selection",
      "Dessert included",
      "Premium serviceware",
    ],
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    description: "Ultimate celebration package",
    priceRange: "Starting at $85/person",
    features: [
      "4 entrées",
      "5 sides",
      "Premium appetizers",
      "Dessert bar",
      "Full service staff",
      "Custom menu consultation",
    ],
  },
];

// How It Works Steps
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Reach Out",
    description:
      "Contact us with your event details. We'll discuss your vision, guest count, and preferences.",
  },
  {
    step: 2,
    title: "Plan Together",
    description:
      "We'll create a custom menu that fits your taste, budget, and dietary needs. Schedule a tasting if you'd like.",
  },
  {
    step: 3,
    title: "Enjoy Your Event",
    description:
      "Relax while we handle everything. From setup to service to cleanup, we've got you covered.",
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. A. Mingo",
    event: "Corporate Event",
    quote:
      "Chef Yaya provided an exceptional culinary experience from start to finish. The food was not only incredibly tasty but also beautifully presented, with great attention to detail in every dish. My colleagues and family were thoroughly impressed by the quality, flavor, and creativity of the menu. I would recommend Chef Yaya hands down to anyone looking for a talented, reliable, and professional chef.",
    rating: 5,
    date: "2025",
  },
  {
    id: 2,
    name: "Senior Partners Organization",
    event: "Organization Event",
    quote:
      "On behalf of Senior Partners Organization, Chef Yaya did an amazing job catering our event. The food was absolutely delicious, and everything was extremely well coordinated from start to finish. Her professionalism, attention to detail, and seamless execution made the event even more enjoyable. We will definitely be using her catering business again and highly recommend her services.",
    rating: 5,
    date: "2025",
  },
  {
    id: 3,
    name: "JCCGCI",
    event: "Community Events",
    quote:
      "KDS Comfort Food has been an exceptional food vendor for JCCGCI and a trusted partner for a wide range of community events, including domestic violence awareness programs, youth initiatives, and senior social events. Chef Yajaira Springer consistently demonstrates professionalism, reliability, and care in every aspect of her service. Orders arrive on time, and the presentation is consistently clean, polished, and visually appealing.",
    rating: 5,
    date: "2025",
  },
  {
    id: 4,
    name: "Satisfied Customer",
    event: "Private Dining",
    quote:
      "Chef Yaya, NEVER disappoints!!! This food is truly comforting and delicious. Trust me, you can taste the love in every dish. And the presentation is simply AMAZING! My absolute favorites are the creamed spinach, Macaroni and cheese, Rasta pasta, pan seared salmon in butter garlic sauce, and banana pudding. The food is very fresh with just the right amount of flavor—you'll love every bite!",
    rating: 5,
    date: "2025",
  },
];

// FAQ Items
export const FAQ_ITEMS = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-4 weeks in advance for smaller events and 2-3 months for weddings and large corporate events. However, we understand that last-minute events happen, so don't hesitate to reach out even with shorter notice—we'll do our best to accommodate you.",
  },
  {
    question: "Do you offer tastings before booking?",
    answer:
      "Yes! We offer complimentary tastings for wedding and large event bookings (50+ guests). For smaller events, tastings are available for a nominal fee that's credited toward your final invoice if you book with us.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Absolutely. We have extensive experience with vegetarian, vegan, gluten-free, and allergy-friendly options. Just let us know your guests' needs, and we'll create delicious alternatives that everyone can enjoy.",
  },
  {
    question: "What's included in your catering packages?",
    answer:
      "Our packages include food preparation, delivery, setup, and serviceware. Full-service packages also include professional staff for serving and cleanup. We'll provide a detailed breakdown during your consultation.",
  },
  {
    question: "Do you cater outside NYC?",
    answer:
      "Yes! We serve the entire Tri-State area including Long Island, Westchester, Northern New Jersey, and parts of Connecticut. Travel fees may apply depending on location and event size.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require a 50% deposit to secure your date. Cancellations made 14+ days before the event receive a full deposit refund. Cancellations within 7-14 days receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations within 7 days of the event.",
  },
  {
    question: "Do you provide staff for events?",
    answer:
      "Yes, our Silver and Gold packages include professional service staff. For Bronze packages or drop-off catering, staff can be added for an additional fee. Our team is trained in hospitality and will ensure your guests are well taken care of.",
  },
  {
    question: "How do I get a quote for my event?",
    answer:
      "Simply fill out our contact form or give us a call. We'll ask about your event date, guest count, service style, and menu preferences. We typically send detailed quotes within 24-48 hours.",
  },
];

// Value Propositions
export const VALUE_PROPOSITIONS = [
  {
    title: "Classic Comfort",
    description:
      "Classic comfort with a contemporary touch. Award-winning cuisine made with love and the finest ingredients.",
    icon: "heart",
  },
  {
    title: "Premium Quality",
    description:
      "Fresh, locally-sourced ingredients prepared by Chef Yaya, a National Black Chef's Association Hall of Fame recipient.",
    icon: "star",
  },
  {
    title: "Full Service",
    description:
      "From planning to cleanup, we handle every detail so you can focus on enjoying your event.",
    icon: "check",
  },
  {
    title: "Custom Menus",
    description:
      "Every event is unique. We work with you to create a menu that perfectly fits your vision and budget.",
    icon: "utensils",
  },
];
