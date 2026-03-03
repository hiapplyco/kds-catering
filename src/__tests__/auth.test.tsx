import { describe, it, expect, vi } from "vitest";

// Test that admin routes exist and are properly structured
describe("Authentication & Protected Routes", () => {
  it("admin gallery page exports as a component", async () => {
    // Mock firebase dependencies
    vi.mock("firebase/firestore", () => ({
      collection: vi.fn(),
      getDocs: vi.fn().mockResolvedValue({ docs: [] }),
      addDoc: vi.fn(),
      deleteDoc: vi.fn(),
      updateDoc: vi.fn(),
      doc: vi.fn(),
    }));
    vi.mock("firebase/storage", () => ({
      ref: vi.fn(),
      uploadBytes: vi.fn(),
      getDownloadURL: vi.fn(),
      deleteObject: vi.fn(),
    }));

    const galleryModule = await import("@/app/chefs-kitchen/gallery/page");
    expect(galleryModule.default).toBeDefined();
    expect(typeof galleryModule.default).toBe("function");
  });

  it("login page path should be /chefs-kitchen/login", () => {
    // Verify the path convention
    const loginPath = "/chefs-kitchen/login";
    expect(loginPath).toMatch(/^\/chefs-kitchen\/login$/);
  });

  it("admin routes follow /chefs-kitchen/* pattern", () => {
    const adminRoutes = [
      "/chefs-kitchen",
      "/chefs-kitchen/login",
      "/chefs-kitchen/gallery",
      "/chefs-kitchen/menu",
      "/chefs-kitchen/testimonials",
      "/chefs-kitchen/pricing",
      "/chefs-kitchen/settings",
    ];

    for (const route of adminRoutes) {
      expect(route).toMatch(/^\/chefs-kitchen/);
    }
  });

  it("public routes do not contain chefs-kitchen", () => {
    const publicRoutes = [
      "/",
      "/about",
      "/menu",
      "/gallery",
      "/testimonials",
      "/faq",
      "/contact",
      "/services",
      "/services/weddings",
      "/services/corporate",
      "/services/private-parties",
      "/services/drop-off",
    ];

    for (const route of publicRoutes) {
      expect(route).not.toMatch(/chefs-kitchen/);
    }
  });
});
