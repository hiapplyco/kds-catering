import {
  Hero,
  ValuePropositions,
  ServicesGrid,
  VideoShowcase,
  HowItWorks,
  InlineTestimonial,
  MenuPreview,
  TestimonialsCarousel,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePropositions />
      <ServicesGrid />
      <VideoShowcase />
      <HowItWorks />
      {/* Inline testimonial snippet between sections */}
      <InlineTestimonial testimonialIndex={3} variant="light" />
      <MenuPreview />
      <TestimonialsCarousel />
      <CTASection />
    </>
  );
}
