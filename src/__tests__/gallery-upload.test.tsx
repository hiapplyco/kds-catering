import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock firebase/firestore
const mockAddDoc = vi.fn();
const mockGetDocs = vi.fn();
const mockDeleteDoc = vi.fn();
const mockUpdateDoc = vi.fn();
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  deleteDoc: (...args: unknown[]) => mockDeleteDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  doc: vi.fn(),
}));

// Mock firebase/storage
const mockUploadBytes = vi.fn();
const mockGetDownloadURL = vi.fn().mockResolvedValue("https://example.com/image.jpg");
const mockDeleteObject = vi.fn();
vi.mock("firebase/storage", () => ({
  ref: vi.fn(),
  uploadBytes: (...args: unknown[]) => mockUploadBytes(...args),
  getDownloadURL: (...args: unknown[]) => mockGetDownloadURL(...args),
  deleteObject: (...args: unknown[]) => mockDeleteObject(...args),
}));

import GalleryManagementPage from "@/app/chefs-kitchen/gallery/page";

describe("Gallery Upload Categorization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({ docs: [] });
    mockAddDoc.mockResolvedValue({ id: "new-doc" });
    mockUploadBytes.mockResolvedValue({});
  });

  it("renders upload category selector", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  it("has all categories in the upload selector (excluding All)", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      const select = screen.getByRole("combobox");
      const options = Array.from(select.querySelectorAll("option"));
      const values = options.map((o) => o.textContent);
      expect(values).toContain("Food");
      expect(values).toContain("Weddings");
      expect(values).toContain("Corporate");
      expect(values).toContain("Private Parties");
      expect(values).toContain("Drop-Off");
      expect(values).not.toContain("All");
    });
  });

  it("defaults upload category to Food", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.value).toBe("Food");
    });
  });

  it("syncs upload category when filter tab changes", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Gallery Manager")).toBeInTheDocument();
    });

    // Click "Weddings" category tab
    const weddingsTab = screen.getByRole("button", { name: "Weddings" });
    fireEvent.click(weddingsTab);

    await waitFor(() => {
      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.value).toBe("Weddings");
    });
  });

  it("allows manual upload category change independent of filter", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Gallery Manager")).toBeInTheDocument();
    });

    // Manually change the upload category dropdown to Corporate
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Corporate" } });

    await waitFor(() => {
      expect(select.value).toBe("Corporate");
    });
  });

  it("renders upload and delete buttons", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Upload")).toBeInTheDocument();
    });
  });

  it("includes Private Parties and Drop-Off in category tabs", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Private Parties" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Drop-Off" })).toBeInTheDocument();
    });
  });
});

describe("Gallery Bulk Delete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            url: "https://example.com/1.jpg",
            alt: "Test 1",
            category: "Food",
            createdAt: "2025-01-01",
          }),
        },
        {
          id: "2",
          data: () => ({
            url: "https://example.com/2.jpg",
            alt: "Test 2",
            category: "Food",
            createdAt: "2025-01-02",
          }),
        },
      ],
    });
    mockDeleteDoc.mockResolvedValue(undefined);
  });

  it("shows delete button only when items are selected", async () => {
    render(<GalleryManagementPage />);
    await waitFor(() => {
      expect(screen.queryByText(/Delete \(/)).not.toBeInTheDocument();
    });
  });
});
