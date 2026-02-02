# KD's Comfort Food — Light Comfort Experience Review (2026)

## Executive Read
- The build already hits many hospitality beats (rich photography, proof-driven copy), but the overall palette and weighty overlays skew dark and luxe instead of the breezy, Brooklyn comfort brief; focus near-term effort on lightening above-the-fold color, spacing, and CTAs.
- Section scaffolding is consistent, yet sameness in heading scale, background blocks, and storytelling cadence buries the brand narrative; diversify layouts and typography so visitors quickly feel the chef's warmth, heritage, and menu depth.
- Motion, video, and gallery experiences feel premium, but lack of reduced-motion handling and some technical gaps (contrast, lingering event listeners) degrade accessibility; align the sensory layer with WCAG and modern performance expectations.

## Brand & Visual Direction
### Observations
1. Brand colors lean heavily on saturated burnt orange (#E67E22) and deep brown (#5D4037) with sparse neutrals (`tailwind.config.ts:11`). Pairing those with compounded hero gradients (`src/components/sections/Hero.tsx:78`) keeps the first impression dark and weighty.
2. Typography is limited to Playfair + Montserrat via the global import and reusable heading class (`src/app/globals.css:5` and `src/app/globals.css:67`). Every major heading renders at 4xl/5xl, creating a stately but monotonous reading rhythm.
3. Buttons and badges reuse the same high-contrast treatments (`src/app/globals.css:30`), so tertiary interactions (e.g., "Explore Our Menu" in the hero) fight for attention against revenue-driving CTAs.

### Recommendations
- Introduce an expanded neutral stack (chamomile, oat milk white, pale sage) + softer accent (soft persimmon) and update Tailwind tokens so primary sections can breathe; reserve the current espresso background for hero overlays and footer anchor moments.
- Replace the static `section-heading` utility with a responsive `clamp()` scale that tapers on mobile and varies weight per section (storytelling, data, testimonials). Pair with a body serif (Cormorant or Spectral) for pull quotes to amplify the handcrafted narrative.
- Add a ghost/tertiary button style in `globals.css` for supporting actions and convert hero secondary CTA to that tone-on-tone treatment so "Book Your Event" owns the foreground.

## Layout & Content Hierarchy
### Observations
1. The hero slider rotates every six seconds and maintains a dense Ken Burns background with multiple overlays (`src/components/sections/Hero.tsx:43` and `src/components/sections/Hero.tsx:78-120`), which looks cinematic but conflicts with the requested light comfort mood.
2. Any section that uses the "cream" background inherits the same margin, divider, and copy cadence (`src/app/globals.css:67-80`), so the homepage reads like a stacked landing page with little contextual contrast between value props, services, and testimonials.
3. The menu package row renders white text atop a cream background (`src/app/menu/page.tsx:124-134`), producing insufficient contrast and implying the entire card is disabled.

### Recommendations
- Rework the hero to a split layout (soft cream surface + floating dish photography) and use a subtle 15% gradient instead of two heavy overlays; consider an inline ticker showing Brooklyn neighborhoods served to ground the local story.
- Break the repeating section template by introducing asymmetric grids (copy left / imagery right), interstitial microcopy (chef notes, sourcing callouts), and color blocking that alternates between translucent creams and barely-there golds.
- Restyle the catering packages with true white cards, thin serif titles, and color-coded tabs; ensure dark-on-light copy and add price chips or "Serves 50+" metadata so planners can scan quickly.

## Conversion, Navigation & Content
### Observations
1. Desktop nav packs eight items plus a dropdown (`src/components/layout/Header.tsx:51-111`), yet the only conversion element is a generic "Book Now" button; there is no quick link to tastings or menu downloads despite their prominence elsewhere.
2. The sticky Mobile CTA presents two equal-weight buttons (`src/components/layout/MobileCTA.tsx:31-49`), causing friction for users who just want to text or view menus while on the subway.
3. Service pages reuse the same template (hero, features, why-us, menu) without contextual embellishments such as testimonials or venue partnerships (`src/components/ui/ServicePageTemplate.tsx:24-203`), leaving planners to infer differentiation.

### Recommendations
- Refine the nav to anchor around three key journeys (Plan Event, Explore Menu, See Work) and convert the right rail into a dual CTA chip: "Book tasting" + phone link. On mobile, collapse tertiary pages under a lighter expandable pattern.
- Let the floating Mobile CTA adapt to scroll context: lead with "Text Chef Yaya" once the user opens the menu or gallery, and only show "Book" after they've watched a video or hit 50% scroll depth.
- Extend the service template with dynamic blocks (client logos, tasting galleries, timeline cards) and lighten each hero with venue photography or pastel overlays matched to the event type.

## Motion, Media & Interaction
### Observations
1. Framer Motion is used extensively without honoring `prefers-reduced-motion`; hero transitions, slider fades, and scroll-triggered animations all run regardless of user settings (`src/components/sections/Hero.tsx:55-144`, `src/components/sections/TestimonialsCarousel.tsx:31-93`).
2. Videos auto-play muted both in the hero preview and modals (`src/components/ui/VideoModal.tsx:61-114`), but there is no progress indicator or sound-on messaging beyond a small tooltip.
3. Gallery keyboard support is added by binding listeners inside the component body rather than in `useEffect`, so events may attach multiple times and they never detach (`src/app/gallery/page.tsx:274-285`).

### Recommendations
- Wrap all motion components in a custom hook that returns reduced-motion variants when the OS signals it, and lower the hero's Ken Burns scale to 1.05 to keep motion subtle.
- Provide clear video controls: add a play pulse, "Tap for audio" microcopy, and pause previews when they leave the viewport using `IntersectionObserver` to save bandwidth.
- Move the gallery keyboard handler into `useEffect` with proper cleanup so assistive tech users can trust the modal experience.

## Accessibility & Technical Polish
- Slider pagination buttons lack `aria-pressed` / labels beyond "Go to slide" (`src/components/sections/Hero.tsx:180-191`), which makes it harder for SR users to know the active state; switch to `role="tablist"` semantics or toggle `aria-current`.
- Testimonials rely on color (orange vs. brown) to convey active states (`src/components/sections/TestimonialsCarousel.tsx:106-155`); add shape or weight cues so the state change survives grayscale / low-light conditions.
- Menu filters render as bordered pills but do not expose their pressed state via `aria-pressed` or `aria-controls` (`src/app/menu/page.tsx:142-194`); adopt the WAI-ARIA button pattern to make filtering legible to screen readers.

## Roadmap & Next Steps
1. **Re-skin the hero + global tokens (Week 1-2):** Update Tailwind palette + typography scale, recompose hero layout, and QA across breakpoints to nail the light comfort tone before further UX work.
2. **Diversify key journeys (Week 2-3):** Redesign nav/CTA system, refresh service template with contextual modules, and restyle the menu package section for clarity.
3. **Stabilize motion & accessibility (Week 3-4):** Implement reduced-motion guardrails, fix gallery keyboard bindings, audit controls (filters, sliders, video modal) for aria/contrast compliance, and re-run Lighthouse/AXE.
4. **Layer story-driven content (Week 4+):** Add chef notes, Brooklyn neighborhood highlights, and client spotlights between sections to reinforce the comfort-food narrative while keeping visuals airy.

These moves will keep the current premium craft but deliver the lighter, neighborhood-centric comfort experience that Brooklyn couples, office managers, and community organizers expect in 2026.
