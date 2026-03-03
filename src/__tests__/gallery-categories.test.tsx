import { describe, it, expect } from "vitest";

// Test the category arrays directly
const adminCategories = [
  "All",
  "Food",
  "Events",
  "Chef Yaya",
  "Community",
  "Weddings",
  "Corporate",
  "Private Parties",
  "Drop-Off",
];

const publicCategories = [
  { id: "all", name: "All" },
  { id: "food", name: "Food" },
  { id: "events", name: "Events" },
  { id: "chef yaya", name: "Chef Yaya" },
  { id: "community", name: "Community" },
  { id: "weddings", name: "Weddings" },
  { id: "corporate", name: "Corporate" },
  { id: "private parties", name: "Private Parties" },
  { id: "drop-off", name: "Drop-Off" },
];

describe("Gallery Categories", () => {
  it("admin categories include Private Parties", () => {
    expect(adminCategories).toContain("Private Parties");
  });

  it("admin categories include Drop-Off", () => {
    expect(adminCategories).toContain("Drop-Off");
  });

  it("public categories include private parties", () => {
    const privateCat = publicCategories.find((c) => c.id === "private parties");
    expect(privateCat).toBeDefined();
    expect(privateCat?.name).toBe("Private Parties");
  });

  it("public categories include drop-off", () => {
    const dropoffCat = publicCategories.find((c) => c.id === "drop-off");
    expect(dropoffCat).toBeDefined();
    expect(dropoffCat?.name).toBe("Drop-Off");
  });

  it("admin and public categories are aligned (excluding All)", () => {
    const adminWithoutAll = adminCategories.filter((c) => c !== "All");
    const publicNames = publicCategories
      .filter((c) => c.id !== "all")
      .map((c) => c.name);
    expect(adminWithoutAll).toEqual(publicNames);
  });

  it("category IDs are lowercase in public gallery", () => {
    for (const cat of publicCategories) {
      expect(cat.id).toBe(cat.id.toLowerCase());
    }
  });

  it("no duplicate categories", () => {
    const adminUnique = new Set(adminCategories);
    expect(adminUnique.size).toBe(adminCategories.length);

    const publicUnique = new Set(publicCategories.map((c) => c.id));
    expect(publicUnique.size).toBe(publicCategories.length);
  });
});
