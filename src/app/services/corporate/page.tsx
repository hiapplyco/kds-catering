import { Metadata } from "next";
import ServicePageTemplate from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Corporate Event Catering",
  description:
    "Impress clients and energize your team with KDS Comfort Food corporate catering. Classic comfort with a contemporary touch for business events in NYC.",
};

export default function CorporatePage() {
  return (
    <ServicePageTemplate
      title="Corporate Events"
      description="Impress clients and energize your team with premium catering from Chef Yaya. From board meetings to company celebrations, we deliver exceptional food with professional presentation that reflects your company's standards."
      heroImage="/images/food/catering-spread-caesar-salads.jpeg"
      galleryImages={[
        "/images/food/boxed-lunches-sandwich-pasta-cookies.jpg",
        "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
        "/images/food/glazed-salmon-noodles-meal-prep.jpg",
        "/images/food/garden-salad-platter.jpg",
      ]}
      features={[
        "Corporate account management",
        "Flexible scheduling for busy offices",
        "Volume pricing for regular orders",
        "Professional presentation and setup",
        "On-time delivery guaranteed",
        "Individual and family-style options",
        "Dietary labeling included",
        "Invoice and billing options",
      ]}
      whyChooseUs={[
        {
          title: "Reliability",
          description:
            "Orders arrive on time—critical for the success of your events. We understand corporate timelines.",
        },
        {
          title: "Professional Presentation",
          description:
            "Clean, polished, and visually appealing presentations that impress clients and executives.",
        },
        {
          title: "Scalability",
          description:
            "From 10-person lunches to 500-guest galas, we handle events of all sizes with the same care.",
        },
        {
          title: "Award-Winning Chef",
          description:
            "Chef Yaya is a National Black Chef's Association Hall of Fame recipient with 15+ years experience.",
        },
        {
          title: "Dietary Options",
          description:
            "Vegetarian, vegan, and gluten-free options available with clear labeling.",
        },
        {
          title: "Budget Flexibility",
          description:
            "Bronze, Silver, and Gold package tiers to fit different corporate budgets without sacrificing quality.",
        },
      ]}
      sampleMenu={[
        {
          category: "Breakfast",
          items: [
            "Continental Breakfast",
            "Buffet Breakfast with Waffles & French Toast",
            "Fresh Fruit Platter",
            "Coffee & Tea Service",
          ],
        },
        {
          category: "Lunch Entrées",
          items: [
            "Jerk Chicken",
            "Pan-Seared Salmon",
            "Rasta Pasta",
            "Jambalaya Rice",
          ],
        },
        {
          category: "Sides & Salads",
          items: [
            "Caesar Salad",
            "Mixed Greens",
            "Mac and Cheese",
            "Rice and Peas",
          ],
        },
      ]}
    />
  );
}
