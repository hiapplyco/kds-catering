# Product Requirements Document: Gallery Media Enhancement
## KDS Comfort Food Catering Website

**Author:** Troy McClure ("You may remember me from such PRDs as 'Visual Excellence: A Love Story'!")
**Date:** 2026-01-31
**Version:** 1.0
**Status:** Implemented ✅

---

## 1. Executive Summary

### The Problem
The KDS Comfort Food Catering website was using stock photography that didn't represent the authentic, award-winning cuisine of Chef Yaya. Stock photos create a disconnect between visitor expectations and the actual high-quality, personalized service that KDS provides.

### The Solution
Replace all stock imagery with authentic photos and videos from the Gallery page—real dishes, real events, and real Chef Yaya moments. Enhance the site with video content to create a more dynamic, engaging experience.

### The Impact
- **Brand Authenticity:** Every image now represents actual KDS cuisine
- **Trust Building:** Visitors see real work, not generic stock photos
- **Engagement:** Video backgrounds and interactive elements increase time on site
- **Differentiation:** Unique visuals set KDS apart from competitors using stock imagery

---

## 2. User Feedback (Original Request)

> "Remove any stock photo and only rely on imagery and videos from the Gallery page. I'm talking all subpages. Look through this entire transcript and enhance the content across the entire site."

### Interpreted Requirements
1. **Audit entire site** for stock photo usage
2. **Replace with Gallery assets** (authentic KDS imagery)
3. **Enhance with video** where appropriate
4. **Apply to ALL subpages** (comprehensive update)

---

## 3. Available Asset Inventory

### Food Photography (14 images)
| Filename | Description | Best Use |
|----------|-------------|----------|
| `guacamole-bread-cups-edible-flowers.jpg` | Elegant appetizer presentation | Hero, Appetizers |
| `glazed-salmon-noodles-meal-prep.jpg` | Chef Yaya signature dish | Entrées, Hero |
| `braised-oxtails.jpg` | Caribbean comfort classic | Entrées, About |
| `fruit-platter-orange-rose-garnish.jpg` | Artistic fruit arrangement | Weddings, Desserts |
| `jerk-chicken-rice-peas.jpeg` | Authentic jerk chicken | Parties, Drop-off |
| `cookie-brownie-platters-strawberry-roses.jpg` | Elegant dessert display | Weddings, Events |
| `fruit-salad-cups.jpg` | Individual serving presentation | Corporate, Parties |
| `creamy-penne-pasta-vegetables.jpg` | Comfort pasta dish | Entrées, Drop-off |
| `catering-spread-caesar-salads.jpeg` | Event setup shot | Corporate, Services |
| `boxed-lunches-sandwich-pasta-cookies.jpg` | Packaged catering display | Corporate, Drop-off |
| `arroz-con-pollo.jpg` | Chicken and rice classic | Entrées, Parties |
| `fresh-fruit-platter.jpg` | Fresh fruit arrangement | All services |
| `garden-salad-platter.jpg` | Salad presentation | Corporate, Events |
| `buffet-line-rice-beans-empanadas-chicken.jpg` | Full buffet spread | Events, Parties |

### Chef Yaya Photography (9 images)
| Filename | Description | Best Use |
|----------|-------------|----------|
| `chef-yaya-outdoor-portrait.jpg` | Professional outdoor shot | About hero |
| `chef-yajaira-portrait-black-pink-coat.jpg` | Elegant portrait | About, Contact |
| `chef-yaya-hall-of-fame-award.jpg` | Award ceremony | About, Credentials |
| `nbca-awards-2025-promo-chef-yajaira.jpg` | NBCA promotional | About, Footer |
| `chef-yaya-senator-schumer.jpg` | With Senator Schumer | Notable clients |
| `chef-yaya-mayor-dinkins.jpg` | With Mayor Dinkins | Notable clients |
| `chef-yajaira-avenues-for-justice-feature.jpg` | Community feature | About, Community |
| `chef-yaya-nyc-school-event.jpg` | School event | Community, Events |
| `chef-yaya-manhattan-6th-ave.jpg` | NYC street portrait | About, Contact |

### Video Assets (5 videos)
| Filename | Content | Duration | Best Use |
|----------|---------|----------|----------|
| `roasted-turkey.mp4` | Holiday turkey presentation | Short | Weddings, About |
| `decorative-salad.mp4` | Salad artistry | Short | Weddings, Hero |
| `garden-salad-platter.mp4` | Fresh salad close-up | Short | Corporate, Menu |
| `catering-trays.mp4` | Buffet setup in action | Short | Home Hero, Services |
| `salmon-seafood-dish.mp4` | Seafood preparation | Short | Parties, Menu |

---

## 4. Implementation Details

### Stock Photos Removed
The following stock photos were identified and removed:
1. `appetizer-platter-chips-guac-taquitos-skewers.jpg`
2. `appetizer-spread-wings-shrimp.jpg`
3. `charcuterie-fruit-board.jpg`
4. `fruit-platter-cat-face-design.jpg`
5. `grilled-salmon-mash-asparagus.jpg`
6. `grilled-vegetable-medley.jpg`
7. `lemon-herb-grilled-chicken.jpg`
8. `shrimp-cocktail-cups-wooden-board.jpg`

**Total Removed:** 8 stock photos (~2.8 MB saved)

### Pages Enhanced

#### Home Page (`/`)
| Component | Enhancement |
|-----------|-------------|
| `Hero.tsx` | Video background using `catering-trays.mp4` with image fallback |
| `MenuPreview.tsx` | Hover-to-play video on Glazed Salmon card |

#### About Page (`/about`)
| Section | Enhancement |
|---------|-------------|
| New Video Showcase | 2-video grid featuring holiday and seafood videos |
| Hall of Fame Section | Multi-image collage (3 chef photos in grid layout) |
| Values Section | Redesigned with side-by-side food image grid |

#### Menu Page (`/menu`)
| Section | Enhancement |
|---------|-------------|
| New Video Section | "See Our Dishes Come to Life" with roasted turkey video |
| Positioned before | Package tiers for visual impact |

#### Service Pages (Template Enhancement)
| Feature | Implementation |
|---------|----------------|
| `heroVideo` prop | Optional video background for hero sections |
| `featuredVideo` section | New component with title, description, video player |
| Video controls | Play, pause, poster image support |

#### Weddings (`/services/weddings`)
| Element | Asset |
|---------|-------|
| Hero Video | `decorative-salad.mp4` |
| Featured Video | `roasted-turkey.mp4` ("Elegant Presentations") |

#### Corporate (`/services/corporate`)
| Element | Asset |
|---------|-------|
| Hero Video | `catering-trays.mp4` |
| Featured Video | `garden-salad-platter.mp4` ("Fresh & Professional") |

#### Private Parties (`/services/private-parties`)
| Element | Asset |
|---------|-------|
| Hero Video | `catering-trays.mp4` |
| Featured Video | `salmon-seafood-dish.mp4` ("Party-Perfect Cuisine") |

#### Drop-Off (`/services/drop-off`)
| Element | Asset |
|---------|-------|
| Featured Video | `catering-trays.mp4` ("Ready to Serve") |

---

## 5. Technical Specifications

### Video Implementation Patterns

#### Background Video (Hero)
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/images/food/fallback.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/video.mp4" type="video/mp4" />
</video>
```

#### Interactive Hover Video (MenuPreview)
```tsx
<video
  muted
  loop
  playsInline
  onMouseEnter={(e) => e.currentTarget.play()}
  onMouseLeave={(e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }}
>
```

#### Featured Video with Controls
```tsx
<video
  controls
  playsInline
  preload="metadata"
  poster={video.poster}
>
```

### ServicePageTemplate Props Added
```typescript
interface ServicePageTemplateProps {
  // ... existing props
  heroVideo?: string;           // Optional video background
  featuredVideo?: {
    src: string;
    poster: string;
    title: string;
    description: string;
  };
}
```

---

## 6. Remaining Gaps & Future Enhancements

### Identified Gaps

| Gap | Priority | Recommendation |
|-----|----------|----------------|
| Contact page lacks imagery | Medium | Add chef portrait or food image |
| FAQ page is text-only | Low | Consider testimonial photos |
| Testimonials page needs faces | Medium | Add client photos if available |
| No video on Gallery page hero | Low | Could add video background |

### Future Enhancement Opportunities

#### Phase 2: Content Expansion
1. **New Video Content Needed:**
   - Meal prep process video
   - Event setup timelapse
   - Chef Yaya cooking demonstration
   - Client testimonial videos

2. **Photography Opportunities:**
   - Recent event photos
   - Behind-the-scenes kitchen shots
   - Happy client candids (with permission)

#### Phase 3: Advanced Features
1. **Video Gallery Page:**
   - Separate section for video content
   - YouTube/Vimeo integration for longer content

2. **Interactive Elements:**
   - Before/after event sliders
   - 360° food photography
   - Interactive menu with food images

3. **Performance Optimization:**
   - Lazy-load videos below fold
   - WebP image format conversion
   - Video thumbnail sprites

---

## 7. Success Metrics

### Immediate (Implemented)
- [x] Zero stock photos on site
- [x] Video backgrounds on hero sections
- [x] All service pages have video content
- [x] About page enhanced with multi-image layouts
- [x] Menu page has video showcase
- [x] Build successful (no errors)

### Measurable Outcomes (Track Post-Deploy)
- Time on page increase
- Bounce rate decrease
- Contact form submission increase
- Gallery page engagement

---

## 8. Files Modified

| File | Changes |
|------|---------|
| `src/components/sections/Hero.tsx` | Video background implementation |
| `src/components/sections/MenuPreview.tsx` | Hover video, video prop support |
| `src/components/ui/ServicePageTemplate.tsx` | heroVideo, featuredVideo props |
| `src/app/about/page.tsx` | Video showcase, image grid layouts |
| `src/app/menu/page.tsx` | Video showcase section |
| `src/app/services/weddings/page.tsx` | Video props added |
| `src/app/services/corporate/page.tsx` | Video props added |
| `src/app/services/private-parties/page.tsx` | Video props added |
| `src/app/services/drop-off/page.tsx` | Video props added |

---

## 9. Appendix

### Build Verification
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (19/19)
✓ Finalizing page optimization
```

### Git Diff Summary
```
19 files changed, 493 insertions(+), 144 deletions(-)
```

---

*"And that's the PRD, folks! You've been a wonderful audience! Remember: authentic imagery builds authentic trust!"*

— Troy McClure

