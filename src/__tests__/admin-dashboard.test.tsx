import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// Mock firebase/firestore
const mockGetDocs = vi.fn();
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: (...args: unknown[]) => mockGetDocs(...args),
}));

import AdminDashboard from "@/app/chefs-kitchen/page";

describe("Admin Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders welcome header", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    expect(screen.getByText(/Welcome to Chef/)).toBeInTheDocument();
  });

  it("renders subtitle", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    expect(screen.getByText("Manage your KDS Comfort Food website content")).toBeInTheDocument();
  });

  it("shows loading state then stats after fetch", async () => {
    mockGetDocs.mockResolvedValue({ size: 5 });
    render(<AdminDashboard />);

    // Should initially show loading placeholders
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);

    // After loading, stats should show
    await waitFor(() => {
      expect(screen.getAllByText("5").length).toBe(4);
    });
  });

  it("displays stat labels", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    await waitFor(() => {
      expect(screen.getByText("Menu Items")).toBeInTheDocument();
      expect(screen.getByText("Gallery Photos")).toBeInTheDocument();
      expect(screen.getByText("Testimonials")).toBeInTheDocument();
      expect(screen.getByText("Packages")).toBeInTheDocument();
    });
  });

  it("renders quick action links", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Add Menu Item")).toBeInTheDocument();
    expect(screen.getByText("Upload Photos")).toBeInTheDocument();
    expect(screen.getByText("Manage Reviews")).toBeInTheDocument();
    expect(screen.getByText("Update Pricing")).toBeInTheDocument();
  });

  it("quick actions have correct href", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    const menuLink = screen.getByText("Add Menu Item").closest("a");
    expect(menuLink).toHaveAttribute("href", "/chefs-kitchen/menu?action=new");

    const galleryLink = screen.getByText("Upload Photos").closest("a");
    expect(galleryLink).toHaveAttribute("href", "/chefs-kitchen/gallery?action=upload");
  });

  it("renders live preview section", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    expect(screen.getByText("Live Preview")).toBeInTheDocument();
    expect(screen.getByText("kdscatering.web.app")).toBeInTheDocument();
  });

  it("renders getting started guide", async () => {
    mockGetDocs.mockResolvedValue({ size: 0 });
    render(<AdminDashboard />);
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("handles fetch errors gracefully (falls back to 0)", async () => {
    // Each getDocs call has its own .catch(() => ({ size: 0 }))
    // so individual errors are caught and return size: 0
    mockGetDocs.mockRejectedValue(new Error("Network error"));
    render(<AdminDashboard />);
    // After errors are caught, stats should be 0
    await waitFor(() => {
      const zeros = screen.getAllByText("0");
      expect(zeros.length).toBeGreaterThanOrEqual(4);
    });
  });

  it("displays different stats per collection", async () => {
    let callCount = 0;
    mockGetDocs.mockImplementation(() => {
      callCount++;
      return Promise.resolve({ size: callCount * 10 });
    });

    render(<AdminDashboard />);
    await waitFor(() => {
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument();
      expect(screen.getByText("40")).toBeInTheDocument();
    });
  });
});
