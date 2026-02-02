import { Metadata } from "next";
import ServicePageTemplate from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Drop-Off Catering",
  description:
    "Quality catering delivered right to your door. KDS Comfort Food drop-off catering is perfect for casual gatherings and office lunches in NYC.",
};

export default function DropOffPage() {
  return (
    <ServicePageTemplate
      title="Drop-Off Catering"
      description="Quality catering delivered right to your door, ready to serve. Perfect for casual gatherings and office lunches—Chef Yaya prepares everything fresh, delivers it on time, and sets it up beautifully."
      heroImage="/images/food/jerk-chicken-rice-peas.jpeg"
      galleryImages={[
        "/images/food/braised-oxtails.jpg",
        "/images/food/arroz-con-pollo.jpg",
        "/images/food/creamy-penne-pasta-vegetables.jpg",
        "/images/food/glazed-salmon-noodles-meal-prep.jpg",
      ]}
      featuredVideo={{
        src: "/videos/meatballs-marinara-tray.mp4",
        poster: "/images/food/buffet-line-rice-beans-empanadas-chicken.jpg",
        title: "Ready to Serve",
        description: "Drop-off catering that's anything but ordinary. Every order arrives beautifully arranged, properly portioned, and ready to impress—with the same award-winning quality you'd expect from our full-service events.",
      }}
      features={[
        "Ready-to-serve setup",
        "Professional presentation",
        "Competitive pricing",
        "On-time delivery guaranteed",
        "Reheating instructions included",
        "Serving utensils provided",
        "Dietary labeling on all items",
        "NYC and Tri-State area delivery",
      ]}
      whyChooseUs={[
        {
          title: "Convenience",
          description:
            "Everything arrives ready to serve. Just open and enjoy—no setup stress.",
        },
        {
          title: "Same Quality",
          description:
            "Same award-winning recipes from Chef Yaya as our full-service options.",
        },
        {
          title: "Affordable",
          description:
            "Get premium catering at a fraction of the cost without service staff fees.",
        },
        {
          title: "On-Time Delivery",
          description:
            "Orders arrive on time—critical for the success of your events.",
        },
        {
          title: "Beautiful Presentation",
          description:
            "Clean, polished, and visually appealing presentations every time.",
        },
        {
          title: "Perfect Portions",
          description:
            "Portioned correctly for your guest count with minimal waste.",
        },
      ]}
      sampleMenu={[
        {
          category: "Popular Combos",
          items: [
            "Jerk Chicken Feast with Rice & Peas",
            "Seafood Combo (Salmon, Shrimp, Lobster)",
            "Wings & Sides Package",
            "Comfort Food Sampler",
          ],
        },
        {
          category: "À La Carte Trays",
          items: [
            "Mac & Cheese (serves 10)",
            "Collard Greens (serves 10)",
            "Candied Yams (serves 10)",
            "Cornbread (2 dozen)",
          ],
        },
        {
          category: "Add-Ons",
          items: [
            "Banana Pudding",
            "Sweet Tea & Lemonade",
            "Fresh Fruit Platter",
            "Charcuterie Board",
          ],
        },
      ]}
    />
  );
}
