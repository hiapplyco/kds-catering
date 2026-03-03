import { describe, it, expect, vi } from "vitest";
import { menuItems } from "@/data/menu";
import { MENU_CATEGORIES } from "@/lib/constants";

describe("Menu Data", () => {
  it("has all expected categories", () => {
    const categoryIds = MENU_CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain("breakfast");
    expect(categoryIds).toContain("appetizers");
    expect(categoryIds).toContain("entrees");
    expect(categoryIds).toContain("sides");
    expect(categoryIds).toContain("pasta");
    expect(categoryIds).toContain("platters");
    expect(categoryIds).toContain("desserts");
    expect(categoryIds).toContain("beverages");
  });

  it("has pasta as a separate category", () => {
    const pastaCategory = MENU_CATEGORIES.find((c) => c.id === "pasta");
    expect(pastaCategory).toBeDefined();
    expect(pastaCategory?.name).toBe("Pasta");
  });

  it("pasta items are in the pasta category", () => {
    const pastaItems = menuItems.filter((item) => item.category === "pasta");
    expect(pastaItems.length).toBeGreaterThanOrEqual(3);
    expect(pastaItems.find((i) => i.name === "Rasta Pasta")).toBeDefined();
    expect(pastaItems.find((i) => i.name === "Chicken Alfredo")).toBeDefined();
    expect(pastaItems.find((i) => i.name === "Shrimp Alfredo")).toBeDefined();
  });

  it("no pasta items are left in entrees", () => {
    const entreeItems = menuItems.filter((item) => item.category === "entrees");
    const pastaInEntrees = entreeItems.filter((item) =>
      ["Rasta Pasta", "Chicken Alfredo", "Shrimp Alfredo"].includes(item.name)
    );
    expect(pastaInEntrees).toHaveLength(0);
  });

  it("each menu item has required fields", () => {
    for (const item of menuItems) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(Array.isArray(item.dietary)).toBe(true);
    }
  });

  it("each menu item category matches a valid MENU_CATEGORIES id", () => {
    const validIds = MENU_CATEGORIES.map((c) => c.id);
    for (const item of menuItems) {
      expect(validIds).toContain(item.category);
    }
  });

  it("has items in every category", () => {
    for (const cat of MENU_CATEGORIES) {
      const items = menuItems.filter((item) => item.category === cat.id);
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it("has popular items marked", () => {
    const popularItems = menuItems.filter((item) => item.popular);
    expect(popularItems.length).toBeGreaterThan(5);
  });

  it("dietary filters contain only valid values", () => {
    const validDietary = ["vegetarian", "vegan", "gluten-free"];
    for (const item of menuItems) {
      for (const d of item.dietary) {
        expect(validDietary).toContain(d);
      }
    }
  });

  it("has unique IDs for all items", () => {
    const ids = menuItems.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
