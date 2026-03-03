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

import MenuManagementPage from "@/app/chefs-kitchen/menu/page";

const mockMenuItems = [
  {
    id: "1",
    data: () => ({
      name: "Braised Oxtails",
      description: "Slow-cooked oxtails",
      category: "Entrées",
      price: "$22/person",
      dietary: ["Gluten-Free"],
      popular: true,
    }),
  },
  {
    id: "2",
    data: () => ({
      name: "Mac & Cheese",
      description: "Creamy baked mac and cheese",
      category: "Sides",
      price: "$8/person",
      dietary: ["Vegetarian"],
      popular: false,
    }),
  },
  {
    id: "3",
    data: () => ({
      name: "Garden Salad",
      description: "Fresh mixed greens",
      category: "Appetizers",
      price: "$6/person",
      dietary: ["Vegan", "Gluten-Free"],
      popular: false,
    }),
  },
];

describe("Admin Menu Management Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({ docs: mockMenuItems });
    mockAddDoc.mockResolvedValue({ id: "new-item" });
  });

  it("renders page title", async () => {
    render(<MenuManagementPage />);
    expect(screen.getByText("Menu Items")).toBeInTheDocument();
  });

  it("renders subtitle", async () => {
    render(<MenuManagementPage />);
    expect(screen.getByText("Manage your catering menu")).toBeInTheDocument();
  });

  it("renders Add Item button", () => {
    render(<MenuManagementPage />);
    expect(screen.getByText("Add Item")).toBeInTheDocument();
  });

  it("displays menu items after loading", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Braised Oxtails")).toBeInTheDocument();
      expect(screen.getByText("Mac & Cheese")).toBeInTheDocument();
      expect(screen.getByText("Garden Salad")).toBeInTheDocument();
    });
  });

  it("shows item prices", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("$22/person")).toBeInTheDocument();
      expect(screen.getByText("$8/person")).toBeInTheDocument();
    });
  });

  it("shows item categories", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Entrées")).toBeInTheDocument();
      expect(screen.getByText("Sides")).toBeInTheDocument();
    });
  });

  it("shows dietary labels", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getAllByText("Gluten-Free").length).toBeGreaterThan(0);
      expect(screen.getByText("Vegetarian")).toBeInTheDocument();
      expect(screen.getByText("Vegan")).toBeInTheDocument();
    });
  });

  it("renders search input", () => {
    render(<MenuManagementPage />);
    expect(screen.getByPlaceholderText("Search menu items...")).toBeInTheDocument();
  });

  it("renders category filter tabs", () => {
    render(<MenuManagementPage />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Appetizers" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrées" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sides" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Desserts" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beverages" })).toBeInTheDocument();
  });

  it("filters items by category", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Braised Oxtails")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Sides" }));

    await waitFor(() => {
      expect(screen.getByText("Mac & Cheese")).toBeInTheDocument();
      expect(screen.queryByText("Braised Oxtails")).not.toBeInTheDocument();
      expect(screen.queryByText("Garden Salad")).not.toBeInTheDocument();
    });
  });

  it("filters items by search query", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Braised Oxtails")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search menu items...");
    fireEvent.change(searchInput, { target: { value: "mac" } });

    await waitFor(() => {
      expect(screen.getByText("Mac & Cheese")).toBeInTheDocument();
      expect(screen.queryByText("Braised Oxtails")).not.toBeInTheDocument();
    });
  });

  it("opens add item modal", async () => {
    render(<MenuManagementPage />);
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByText("Add Menu Item")).toBeInTheDocument();
    });
  });

  it("opens edit item modal with pre-filled data", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Braised Oxtails")).toBeInTheDocument();
    });

    // Click first Edit button
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Edit Menu Item")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Braised Oxtails")).toBeInTheDocument();
    });
  });

  it("shows empty state when no items", async () => {
    mockGetDocs.mockResolvedValue({ docs: [] });
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("No menu items yet. Add your first item!")).toBeInTheDocument();
    });
  });

  it("shows no-match message when search has no results", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Braised Oxtails")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search menu items...");
    fireEvent.change(searchInput, { target: { value: "zzzznonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No items match your search.")).toBeInTheDocument();
    });
  });

  it("modal has dietary options", async () => {
    render(<MenuManagementPage />);
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByText("Dietary Options")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Vegetarian" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Vegan" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Dairy-Free" })).toBeInTheDocument();
    });
  });

  it("modal has popular checkbox", async () => {
    render(<MenuManagementPage />);
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByText("Mark as popular item")).toBeInTheDocument();
    });
  });

  it("renders Edit and Delete for each item", async () => {
    render(<MenuManagementPage />);
    await waitFor(() => {
      const editButtons = screen.getAllByText("Edit");
      const deleteButtons = screen.getAllByText("Delete");
      expect(editButtons.length).toBe(3);
      expect(deleteButtons.length).toBe(3);
    });
  });
});
