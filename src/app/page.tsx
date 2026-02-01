import {
  Hero,
  ValuePropositions,
  ServicesGrid,
  VideoShowcase,
  HowItWorks,
  TestimonialsCarousel,
  MenuPreview,
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
      <MenuPreview />
      <TestimonialsCarousel />
      <CTASection />
    </>
  );
}
