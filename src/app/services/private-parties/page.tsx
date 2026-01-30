import { Metadata } from "next";
import ServicePageTemplate from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Private Party Catering",
  description:
    "Celebrate life's moments with KDS Comfort Food private party catering. Birthday parties, anniversaries, reunions, and more in NYC.",
};

export default function PrivatePartiesPage() {
  return (
    <ServicePageTemplate
      title="Private Parties"
      description="Celebrate life's moments with food that brings people together. Birthday parties, anniversaries, family reunions, and more—Chef Yaya helps you create memorable gatherings with delicious cuisine."
      heroImage="/images/food/appetizer-spread-wings-shrimp.jpg"
      galleryImages={[
        "/images/food/appetizer-platter-chips-guac-taquitos-skewers.jpg",
        "/images/food/fruit-platter-cat-face-design.jpg",
        "/images/food/lemon-herb-grilled-chicken.jpg",
        "/images/food/fruit-salad-cups.jpg",
      ]}
      features={[
        "Customizable menus for any theme",
        "Full-service or drop-off options",
        "Party planning assistance",
        "Special occasion packages",
        "Kid-friendly menu options",
        "Beautiful presentation",
        "On-time delivery guaranteed",
        "Dietary accommodations",
      ]}
      whyChooseUs={[
        {
          title: "Personal Touch",
          description:
            "Chef Yaya treats every party with love and attention to detail—you can taste it in every dish.",
        },
        {
          title: "Crowd Pleasers",
          description:
            "Classic comfort with a contemporary touch that appeals to all ages, from kids to grandparents.",
        },
        {
          title: "Flexible Service",
          description:
            "Choose full-service with staff or convenient drop-off that's ready to serve.",
        },
        {
          title: "Award-Winning Chef",
          description:
            "National Black Chef's Association Hall of Fame recipient with 15+ years experience.",
        },
        {
          title: "Stress-Free Hosting",
          description:
            "Focus on your guests while we handle all the food preparation and service.",
        },
        {
          title: "Memorable Moments",
          description:
            "Great food creates great memories. Your guests will rave about this party.",
        },
      ]}
      sampleMenu={[
        {
          category: "Party Favorites",
          items: [
            "Wings (7 Flavors Available)",
            "Mini Chicken & Waffles",
            "Empanadas (Beef, Chicken, Shrimp)",
            "Deviled Eggs",
          ],
        },
        {
          category: "Main Dishes",
          items: [
            "Fried Chicken",
            "Jerk Chicken with Rice & Peas",
            "Beef Ribs",
            "Rasta Pasta",
          ],
        },
        {
          category: "Desserts",
          items: [
            "Banana Pudding",
            "Sweet Potato Pie",
            "Red Velvet Cake",
            "Rainbow Cake",
          ],
        },
      ]}
    />
  );
}
