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

import PricingManagementPage from "@/app/chefs-kitchen/pricing/page";

const mockPackages = [
  {
    id: "p1",
    data: () => ({
      name: "Bronze Package",
      description: "Essential catering for small gatherings",
      priceRange: "Starting at $35/person",
      features: ["Appetizer selection", "2 entrées", "1 side dish"],
      popular: false,
    }),
  },
  {
    id: "p2",
    data: () => ({
      name: "Silver Package",
      description: "Full-service catering for mid-size events",
      priceRange: "Starting at $55/person",
      features: ["Appetizer selection", "3 entrées", "3 side dishes", "Dessert"],
      popular: true,
    }),
  },
  {
    id: "p3",
    data: () => ({
      name: "Gold Package",
      description: "Premium experience for large celebrations",
      priceRange: "Starting at $85/person",
      features: ["Full appetizer bar", "4 entrées", "4 sides", "Dessert station", "Staff included"],
      popular: false,
    }),
  },
];

describe("Admin Pricing Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({ docs: mockPackages });
    mockAddDoc.mockResolvedValue({ id: "new-pkg" });
  });

  it("renders page title", async () => {
    render(<PricingManagementPage />);
    expect(screen.getByText("Pricing Packages")).toBeInTheDocument();
  });

  it("renders subtitle", async () => {
    render(<PricingManagementPage />);
    expect(screen.getByText("Manage your catering packages and pricing")).toBeInTheDocument();
  });

  it("renders Add Package button", () => {
    render(<PricingManagementPage />);
    expect(screen.getByText("Add Package")).toBeInTheDocument();
  });

  it("displays packages after loading", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Bronze Package")).toBeInTheDocument();
      expect(screen.getByText("Silver Package")).toBeInTheDocument();
      expect(screen.getByText("Gold Package")).toBeInTheDocument();
    });
  });

  it("shows price ranges", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Starting at $35/person")).toBeInTheDocument();
      expect(screen.getByText("Starting at $55/person")).toBeInTheDocument();
      expect(screen.getByText("Starting at $85/person")).toBeInTheDocument();
    });
  });

  it("shows package descriptions", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Essential catering for small gatherings")).toBeInTheDocument();
      expect(screen.getByText("Full-service catering for mid-size events")).toBeInTheDocument();
    });
  });

  it("shows features list", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      // "Appetizer selection" appears in multiple packages
      expect(screen.getAllByText("Appetizer selection").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Dessert station")).toBeInTheDocument();
      expect(screen.getByText("Staff included")).toBeInTheDocument();
    });
  });

  it("shows Most Popular badge for popular package", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Most Popular")).toBeInTheDocument();
    });
  });

  it("opens add package modal with form fields", async () => {
    render(<PricingManagementPage />);
    // Click the top "Add Package" button
    const addButton = screen.getByRole("button", { name: /Add Package/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Package Name *")).toBeInTheDocument();
      expect(screen.getByText("Price Range")).toBeInTheDocument();
      expect(screen.getByText("Features")).toBeInTheDocument();
    });
  });

  it("opens edit modal with pre-filled data", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Bronze Package")).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Edit Package")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Bronze Package")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Starting at $35/person")).toBeInTheDocument();
    });
  });

  it("modal has popular checkbox", async () => {
    render(<PricingManagementPage />);
    fireEvent.click(screen.getByText("Add Package"));

    await waitFor(() => {
      expect(screen.getByText("Mark as most popular")).toBeInTheDocument();
    });
  });

  it("modal has feature input with add button", async () => {
    render(<PricingManagementPage />);
    fireEvent.click(screen.getByText("Add Package"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Add a feature...")).toBeInTheDocument();
    });
  });

  it("shows empty state when no packages", async () => {
    mockGetDocs.mockResolvedValue({ docs: [] });
    render(<PricingManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("No packages yet. Add your first pricing package!")).toBeInTheDocument();
    });
  });

  it("has Edit and Delete for each package", async () => {
    render(<PricingManagementPage />);
    await waitFor(() => {
      const editButtons = screen.getAllByText("Edit");
      const deleteButtons = screen.getAllByText("Delete");
      expect(editButtons.length).toBe(3);
      expect(deleteButtons.length).toBe(3);
    });
  });
});
