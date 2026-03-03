# KDS Comfort Food Catering

Catering website for **Chef Yaya (Yajaira Springer)** — National Black Chef's Association Hall of Fame recipient, Brooklyn, NY.

**Live:** [kdscomfortfoods.com](https://kdscomfortfoods.com) | [kdscatering.web.app](https://kdscatering.web.app)

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** + **Tailwind CSS**
- **Framer Motion** animations
- **Firebase** (Hosting, Firestore, Storage, Auth)
- **Vitest** + React Testing Library (52 tests)

## Getting Started

```bash
npm install
npm run dev          # Development server
npm run build        # Production build (static export → out/)
npm test             # Run test suite
firebase deploy      # Deploy to Firebase Hosting
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, menu preview, video showcase, testimonials |
| `/about` | Chef Yaya's story and credentials |
| `/menu` | Full menu with category filtering and dietary labels |
| `/gallery` | Photo + video gallery with category filtering |
| `/testimonials` | Client reviews with submission form |
| `/contact` | Booking inquiry form |
| `/faq` | Frequently asked questions |
| `/services/weddings` | Wedding catering packages |
| `/services/corporate` | Corporate event catering |
| `/services/private-parties` | Private party catering |
| `/services/drop-off` | Drop-off catering service |

## Admin Dashboard

Accessible at `/chefs-kitchen/` (password-protected):

- **Gallery Manager** — Upload, categorize, replace, and bulk-delete photos/videos
- **Menu Editor** — Add, edit, and reorder menu items with dietary flags
- **Testimonials** — Approve/reject customer-submitted reviews
- **Pricing** — Manage service package pricing tiers
- **Site Settings** — Update contact info, hours, and social links

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── chefs-kitchen/      # Admin dashboard (protected)
│   ├── services/           # Service pages (weddings, corporate, etc.)
│   └── ...                 # Public pages
├── components/
│   ├── layout/             # Header, Footer, MobileCTA
│   ├── sections/           # Homepage sections (Hero, VideoShowcase, etc.)
│   └── ui/                 # Reusable components (ServicePageTemplate, etc.)
├── data/                   # Menu items database
├── lib/                    # Firebase config, hooks, constants
├── __tests__/              # Test suite (8 files, 52 tests)
└── test/                   # Test setup and mocks
public/
├── images/food/            # Real photos only (no stock)
└── videos/                 # Converted MP4 videos
```

## Brand

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#E67E22` | Primary accent, CTAs |
| Brown | `#5D4037` | Text, headers, dark backgrounds |
| Cream | `#FFF8E7` | Light backgrounds |
| Gold | `#D4AF37` | Dividers, highlights |
| Sage | `#8FBC8F` | Secondary accent |
| Persimmon | `#E8654A` | Emphasis, alerts |

## License

Private — All rights reserved. KDS Comfort Food LLC.
