import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Static analysis of Firestore security rules.
 * Tests verify the rules file structure and expected access patterns
 * without requiring the Firebase emulator.
 */

const rulesPath = join(process.cwd(), "firestore.rules");
const rulesContent = readFileSync(rulesPath, "utf-8");

describe("Firestore Security Rules", () => {
  it("uses rules_version 2", () => {
    expect(rulesContent).toContain("rules_version = '2'");
  });

  it("defines an isAdmin() function with email whitelist", () => {
    expect(rulesContent).toContain("function isAdmin()");
    expect(rulesContent).toContain("request.auth.token.email in");
    expect(rulesContent).toContain("james@hiapply.co");
    expect(rulesContent).toContain("gary@hiapply.co");
    expect(rulesContent).toContain("chefyaya@kdscomfortfood.com");
  });

  it("defines rules for all admin collections", () => {
    const collections = ["testimonials", "menuItems", "gallery", "packages", "settings"];
    for (const collection of collections) {
      expect(rulesContent).toContain(`match /${collection}/`);
    }
  });

  it("allows public read for all collections", () => {
    // All collections should have allow read: if true
    const readRules = rulesContent.match(/allow read: if true/g);
    expect(readRules).not.toBeNull();
    expect(readRules!.length).toBe(5); // testimonials, menuItems, gallery, packages, settings
  });

  it("restricts write on admin collections to isAdmin()", () => {
    // menuItems, gallery, packages, settings require isAdmin() for write
    const adminWriteRules = rulesContent.match(/allow write: if isAdmin\(\)/g);
    expect(adminWriteRules).not.toBeNull();
    expect(adminWriteRules!.length).toBe(4); // menuItems, gallery, packages, settings
  });

  it("testimonials allow unauthenticated create with approved=false", () => {
    expect(rulesContent).toContain(
      "allow create: if request.resource.data.approved == false"
    );
  });

  it("testimonials require isAdmin() for update and delete", () => {
    expect(rulesContent).toContain("allow update, delete: if isAdmin()");
  });

  it("does not have overly permissive wildcard rules", () => {
    // Should not have a catch-all allow all rule
    expect(rulesContent).not.toMatch(/allow read, write: if true/);
    expect(rulesContent).not.toMatch(/allow read, write;\s*$/m);
  });

  it("does not allow write for any authenticated user", () => {
    // The old pattern request.auth != null should NOT appear for write rules
    expect(rulesContent).not.toMatch(/allow write: if request\.auth != null/);
    expect(rulesContent).not.toMatch(/allow update, delete: if request\.auth != null/);
  });

  it("settings collection uses doc-level matching", () => {
    expect(rulesContent).toContain("match /settings/{docId}");
  });
});

describe("Firestore Rules — Collection Access Matrix", () => {
  // Verify the access matrix matches what the admin dashboard expects

  it("menuItems: public read, admin-only write", () => {
    const menuSection = rulesContent.match(
      /match \/menuItems\/\{docId\}[\s\S]*?(?=match \/|$)/
    );
    expect(menuSection).not.toBeNull();
    expect(menuSection![0]).toContain("allow read: if true");
    expect(menuSection![0]).toContain("allow write: if isAdmin()");
  });

  it("gallery: public read, admin-only write", () => {
    const gallerySection = rulesContent.match(
      /match \/gallery\/\{docId\}[\s\S]*?(?=match \/|$)/
    );
    expect(gallerySection).not.toBeNull();
    expect(gallerySection![0]).toContain("allow read: if true");
    expect(gallerySection![0]).toContain("allow write: if isAdmin()");
  });

  it("testimonials: public read+create(restricted), admin update/delete", () => {
    const testimonialsSection = rulesContent.match(
      /match \/testimonials\/\{docId\}[\s\S]*?(?=match \/|$)/
    );
    expect(testimonialsSection).not.toBeNull();
    const section = testimonialsSection![0];
    expect(section).toContain("allow read: if true");
    expect(section).toContain("allow create: if request.resource.data.approved == false");
    expect(section).toContain("allow update, delete: if isAdmin()");
  });

  it("packages: public read, admin-only write", () => {
    const packagesSection = rulesContent.match(
      /match \/packages\/\{docId\}[\s\S]*?(?=match \/|$)/
    );
    expect(packagesSection).not.toBeNull();
    expect(packagesSection![0]).toContain("allow read: if true");
    expect(packagesSection![0]).toContain("allow write: if isAdmin()");
  });
});
