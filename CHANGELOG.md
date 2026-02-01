# Changelog

All notable changes to the KDS Comfort Food Catering website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-31

### Added
- **Video Backgrounds**: Hero section now features dynamic video background with `catering-trays.mp4`
- **Service Page Videos**: All service pages now support optional video backgrounds and featured video sections
- **Interactive Menu Preview**: Hover-to-play video functionality on featured menu items
- **About Page Video Showcase**: New section featuring culinary videos (roasted turkey, seafood dishes)
- **Menu Page Video Section**: "See Our Dishes Come to Life" video showcase before package tiers
- **Enhanced About Page Layouts**: Multi-image collage for Hall of Fame section, side-by-side values with food imagery

### Changed
- **Hero Component**: Upgraded from static image to video background with image fallback
- **ServicePageTemplate**: Added `heroVideo` and `featuredVideo` props for enhanced media support
- **MenuPreview Component**: Added video support with hover-to-play interaction
- **About Page**: Reorganized sections with richer visual content from Gallery assets
- **Wedding Page**: Now uses `decorative-salad.mp4` as hero video, `roasted-turkey.mp4` as featured
- **Corporate Page**: Now uses `catering-trays.mp4` as hero video, `garden-salad-platter.mp4` as featured
- **Private Parties Page**: Now uses `catering-trays.mp4` as hero video, `salmon-seafood-dish.mp4` as featured
- **Drop-Off Page**: Added `catering-trays.mp4` as featured video

### Removed
- **Stock Photography**: Removed 8 generic stock photos (~2.8 MB total):
  - `appetizer-platter-chips-guac-taquitos-skewers.jpg`
  - `appetizer-spread-wings-shrimp.jpg`
  - `charcuterie-fruit-board.jpg`
  - `fruit-platter-cat-face-design.jpg`
  - `grilled-salmon-mash-asparagus.jpg`
  - `grilled-vegetable-medley.jpg`
  - `lemon-herb-grilled-chicken.jpg`
  - `shrimp-cocktail-cups-wooden-board.jpg`

### Technical
- All images now sourced exclusively from Gallery page assets
- Video elements use `autoPlay`, `muted`, `loop`, `playsInline` for optimal UX
- Poster images provided for all videos for initial load
- Build verified successful with 19 static pages generated

## [1.0.0] - 2026-01-31

### Added
- Initial website launch
- Home page with Hero, Value Propositions, Services Grid, How It Works, Menu Preview, Testimonials, CTA
- About page with Chef Yaya story, stats, Hall of Fame feature, values, notable clients
- Services overview and individual service pages (Weddings, Corporate, Private Parties, Drop-Off)
- Menu page with package tiers, category filtering, dietary filters
- Gallery page with image lightbox and video showcase
- Testimonials page with client reviews
- FAQ page with expandable questions
- Contact page with form and business information
- Responsive design with Tailwind CSS
- Framer Motion animations throughout
- SEO metadata and sitemap
