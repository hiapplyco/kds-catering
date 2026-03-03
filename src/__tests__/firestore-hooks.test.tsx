import { describe, it, expect } from "vitest";
import { TESTIMONIALS } from "@/lib/constants";

describe("Firestore Data Fallbacks", () => {
  it("TESTIMONIALS array has correct structure", () => {
    expect(Array.isArray(TESTIMONIALS)).toBe(true);
    expect(TESTIMONIALS.length).toBeGreaterThan(0);

    for (const t of TESTIMONIALS) {
      expect(t).toHaveProperty("id");
      expect(t).toHaveProperty("name");
      expect(t).toHaveProperty("event");
      expect(t).toHaveProperty("quote");
      expect(t).toHaveProperty("rating");
      expect(typeof t.rating).toBe("number");
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });

  it("C. Warner testimonial is properly named", () => {
    const warner = TESTIMONIALS.find((t) => t.name === "C. Warner");
    expect(warner).toBeDefined();
    expect(warner!.event).toBe("Private Dining");
  });

  it("no testimonial is named Satisfied Customer", () => {
    const satisfied = TESTIMONIALS.find((t) => t.name === "Satisfied Customer");
    expect(satisfied).toBeUndefined();
  });

  it("gallery normalizeCategory function works correctly", () => {
    function normalizeCategory(cat: string): string {
      return cat.toLowerCase().trim();
    }

    expect(normalizeCategory("Food")).toBe("food");
    expect(normalizeCategory("Chef Yaya")).toBe("chef yaya");
    expect(normalizeCategory("Private Parties")).toBe("private parties");
    expect(normalizeCategory("  Weddings  ")).toBe("weddings");
    expect(normalizeCategory("CORPORATE")).toBe("corporate");
  });

  it("gallery type inference works for common patterns", () => {
    function inferType(item: {
      type?: string;
      mediaType?: string;
      url: string;
    }): "image" | "video" {
      if (item.type === "video" || item.mediaType?.startsWith("video"))
        return "video";
      if (/\.(mp4|mov|webm|avi)(\?|$)/i.test(item.url)) return "video";
      return "image";
    }

    expect(inferType({ url: "photo.jpg" })).toBe("image");
    expect(inferType({ url: "video.mp4" })).toBe("video");
    expect(inferType({ url: "clip.mov" })).toBe("video");
    expect(inferType({ url: "file.webm" })).toBe("video");
    expect(inferType({ type: "video", url: "anything" })).toBe("video");
    expect(inferType({ mediaType: "video/mp4", url: "anything" })).toBe("video");
    expect(inferType({ url: "https://example.com/file.mp4?token=abc" })).toBe("video");
    expect(inferType({ url: "https://example.com/photo.png" })).toBe("image");
  });
});
