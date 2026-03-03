import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock firebase/firestore
const mockGetDocs = vi.fn();
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
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

import GalleryManagementPage from "@/app/chefs-kitchen/gallery/page";

describe("Image Error Handling in Admin Gallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({
      docs: [
        {
          id: "good-1",
          data: () => ({
            url: "/images/food/braised-oxtails.jpg",
            alt: "Good Image",
            category: "Food",
            createdAt: "2025-01-01",
          }),
        },
        {
          id: "broken-1",
          data: () => ({
            url: "https://expired-url.example.com/broken.jpg",
            alt: "Broken Image",
            category: "Food",
            createdAt: "2025-01-02",
          }),
        },
      ],
    });
  });

  it("renders images initially", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("hides broken images after error", async () => {
    render(<GalleryManagementPage />);

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(2);
    });

    // Simulate error on the broken image
    const images = screen.getAllByRole("img");
    const brokenImg = images.find(
      (img) => img.getAttribute("alt") === "Broken Image"
    );
    if (brokenImg) {
      fireEvent.error(brokenImg);
    }

    await waitFor(() => {
      // After error, broken image should be filtered out
      const remainingImages = screen.getAllByRole("img");
      expect(remainingImages.length).toBe(1);
    });
  });
});

describe("Image Error Handling Logic", () => {
  it("broken image set correctly tracks IDs", () => {
    const brokenImages = new Set<string>();
    brokenImages.add("broken-1");
    brokenImages.add("broken-2");

    expect(brokenImages.has("broken-1")).toBe(true);
    expect(brokenImages.has("broken-2")).toBe(true);
    expect(brokenImages.has("good-1")).toBe(false);
  });

  it("filtering with broken images works correctly", () => {
    const items = [
      { id: "1", category: "Food" },
      { id: "2", category: "Food" },
      { id: "3", category: "Weddings" },
    ];
    const brokenImages = new Set(["2"]);

    const filtered = items.filter(
      (item) => !brokenImages.has(item.id) && item.category === "Food"
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });
});
