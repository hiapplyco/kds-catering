import { Metadata } from "next";
import ServicePageTemplate from "@/components/ui/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Wedding Catering",
  description:
    "Make your special day unforgettable with KDS Comfort Food wedding catering. Classic comfort with a contemporary touch for weddings in NYC and the Tri-State area.",
};

export default function WeddingsPage() {
  return (
    <ServicePageTemplate
      title="Wedding Catering"
      description="Make your special day unforgettable with Chef Yaya's wedding catering. Classic comfort with a contemporary touch. From intimate ceremonies to grand celebrations, we bring warmth, flavor, and elegance to your wedding celebration."
      heroImage="/images/food/charcuterie-fruit-board.jpg"
      galleryImages={[
        "/images/food/shrimp-cocktail-cups-wooden-board.jpg",
        "/images/food/guacamole-bread-cups-edible-flowers.jpg",
        "/images/food/fresh-fruit-platter.jpg",
        "/images/food/cookie-brownie-platters-strawberry-roses.jpg",
      ]}
      features={[
        "Custom menu planning with Chef Yaya consultation",
        "Complimentary tasting for couples",
        "Professional service staff",
        "Complete setup and breakdown included",
        "Dietary accommodations (vegetarian, vegan, gluten-free)",
        "On-time delivery guaranteed",
        "Beautiful presentation",
        "Coordination with your venue and planner",
      ]}
      whyChooseUs={[
        {
          title: "Award-Winning Chef",
          description:
            "Chef Yaya is a National Black Chef's Association Hall of Fame recipient, bringing exceptional culinary expertise to your special day.",
        },
        {
          title: "Flexible Menus",
          description:
            "Mix and match dishes to create a menu that tells your unique love story through food.",
        },
        {
          title: "Experienced Team",
          description:
            "Over 500 events catered. We know how to handle every detail with professionalism and care.",
        },
        {
          title: "Beautiful Presentation",
          description:
            "Food that looks as stunning as it tastes. Clean, polished, and visually appealing spreads guaranteed.",
        },
        {
          title: "Stress-Free Service",
          description:
            "From setup to cleanup, we handle everything so you can focus on your celebration.",
        },
        {
          title: "Guest Favorites",
          description:
            "Classic comfort with contemporary touches that appeals to all ages and tastes.",
        },
      ]}
      sampleMenu={[
        {
          category: "Appetizers",
          items: [
            "Crispy Crab Cakes with Remoulade",
            "Deviled Eggs",
            "Shrimp & Grits Bites",
            "Charcuterie & Fruit Board",
          ],
        },
        {
          category: "Entrées",
          items: [
            "Jerk Chicken with Rice & Peas",
            "Pan-Seared Salmon in Butter Garlic Sauce",
            "Braised Oxtails with Butter Beans",
            "Lobster Tails",
          ],
        },
        {
          category: "Sides",
          items: [
            "Three-Cheese Mac & Cheese",
            "Collard Greens",
            "Candied Yams",
            "Buttery Cornbread",
          ],
        },
      ]}
    />
  );
}
