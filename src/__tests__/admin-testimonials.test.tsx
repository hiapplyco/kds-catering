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

import TestimonialsManagementPage from "@/app/chefs-kitchen/testimonials/page";

const mockTestimonials = [
  {
    id: "t1",
    data: () => ({
      name: "Maria Rodriguez",
      event: "Holiday Party",
      quote: "Chef Yaya catered our party and it was phenomenal!",
      rating: 5,
      date: "2025-01-15",
      approved: true,
    }),
  },
  {
    id: "t2",
    data: () => ({
      name: "James Thompson",
      event: "Wedding",
      quote: "The food was incredible at our wedding.",
      rating: 5,
      date: "2024-12-20",
      approved: false,
    }),
  },
  {
    id: "t3",
    data: () => ({
      name: "Linda Chen",
      event: "Birthday Party",
      quote: "Great jerk chicken and rice & peas!",
      rating: 4,
      date: "2024-11-28",
      approved: true,
    }),
  },
];

describe("Admin Testimonials Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocs.mockResolvedValue({ docs: mockTestimonials });
    mockAddDoc.mockResolvedValue({ id: "new-testimonial" });
    mockUpdateDoc.mockResolvedValue(undefined);
  });

  it("renders page title", async () => {
    render(<TestimonialsManagementPage />);
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
  });

  it("renders Add Testimonial button", () => {
    render(<TestimonialsManagementPage />);
    expect(screen.getByText("Add Testimonial")).toBeInTheDocument();
  });

  it("displays testimonials after loading", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Maria Rodriguez")).toBeInTheDocument();
      expect(screen.getByText("James Thompson")).toBeInTheDocument();
      expect(screen.getByText("Linda Chen")).toBeInTheDocument();
    });
  });

  it("shows event types", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Holiday Party")).toBeInTheDocument();
      expect(screen.getByText("Wedding")).toBeInTheDocument();
      expect(screen.getByText("Birthday Party")).toBeInTheDocument();
    });
  });

  it("shows quotes", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText(/Chef Yaya catered/)).toBeInTheDocument();
      expect(screen.getByText(/food was incredible/)).toBeInTheDocument();
    });
  });

  it("shows approved badges for approved testimonials", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      // "Approved" appears as badges (2 items) AND as filter tab button (1)
      const approvedElements = screen.getAllByText("Approved");
      expect(approvedElements.length).toBe(3); // 2 badges + 1 tab
    });
  });

  it("shows pending badge for unapproved testimonials", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });
  });

  it("renders filter tabs", () => {
    render(<TestimonialsManagementPage />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pending" })).toBeInTheDocument();
    // Note: "Approved" appears both as tab and badge; find the tab specifically
    const approvedButtons = screen.getAllByRole("button", { name: "Approved" });
    expect(approvedButtons.length).toBeGreaterThan(0);
  });

  it("filters to show only pending testimonials", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("Maria Rodriguez")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Pending" }));

    await waitFor(() => {
      expect(screen.getByText("James Thompson")).toBeInTheDocument();
      expect(screen.queryByText("Maria Rodriguez")).not.toBeInTheDocument();
      expect(screen.queryByText("Linda Chen")).not.toBeInTheDocument();
    });
  });

  it("shows approve/unapprove toggle buttons", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      const unapproveButtons = screen.getAllByText("Unapprove");
      expect(unapproveButtons.length).toBe(2); // Maria and Linda are approved
      expect(screen.getByText("Approve")).toBeInTheDocument(); // James is pending
    });
  });

  it("opens add testimonial modal with form fields", async () => {
    render(<TestimonialsManagementPage />);
    const addButton = screen.getByRole("button", { name: /Add Testimonial/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Name *")).toBeInTheDocument();
      expect(screen.getByText("Testimonial *")).toBeInTheDocument();
      expect(screen.getByText("Event Type")).toBeInTheDocument();
      expect(screen.getByText("Rating")).toBeInTheDocument();
    });
  });

  it("modal has approval checkbox", async () => {
    render(<TestimonialsManagementPage />);
    fireEvent.click(screen.getByText("Add Testimonial"));

    await waitFor(() => {
      expect(screen.getByText("Approved (visible on website)")).toBeInTheDocument();
    });
  });

  it("shows empty state when no testimonials", async () => {
    mockGetDocs.mockResolvedValue({ docs: [] });
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("No testimonials found.")).toBeInTheDocument();
    });
  });

  it("shows dates for testimonials", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      expect(screen.getByText("2025-01-15")).toBeInTheDocument();
      expect(screen.getByText("2024-12-20")).toBeInTheDocument();
    });
  });

  it("has Edit and Delete for each testimonial", async () => {
    render(<TestimonialsManagementPage />);
    await waitFor(() => {
      const editButtons = screen.getAllByText("Edit");
      const deleteButtons = screen.getAllByText("Delete");
      expect(editButtons.length).toBe(3);
      expect(deleteButtons.length).toBe(3);
    });
  });
});
