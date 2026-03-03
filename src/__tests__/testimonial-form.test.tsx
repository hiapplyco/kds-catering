import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock firebase/firestore
const mockAddDoc = vi.fn();
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
}));

// Mock the reviews module
vi.mock("@/lib/reviews", () => ({
  REVIEW_LINKS: {
    google: "https://google.com/review",
    yelp: "https://yelp.com/review",
  },
}));

import TestimonialForm from "@/components/ui/TestimonialForm";

describe("TestimonialForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAddDoc.mockResolvedValue({ id: "new-testimonial" });
  });

  it("renders the form with all fields", () => {
    render(<TestimonialForm />);
    expect(screen.getByText("Share Your Experience")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John Smith")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Select event type...")).toBeInTheDocument();
    expect(screen.getByText("Submit Testimonial")).toBeInTheDocument();
  });

  it("has all event type options", () => {
    render(<TestimonialForm />);
    const select = screen.getByRole("combobox");
    const options = Array.from(select.querySelectorAll("option"));
    const values = options.map((o) => o.textContent);
    expect(values).toContain("Wedding");
    expect(values).toContain("Corporate Event");
    expect(values).toContain("Private Party");
    expect(values).toContain("Community Event");
    expect(values).toContain("Drop-Off Catering");
  });

  it("shows star rating selector", () => {
    render(<TestimonialForm />);
    expect(screen.getByText("Your Rating *")).toBeInTheDocument();
  });

  it("submits with approved: false", async () => {
    render(<TestimonialForm />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("John Smith"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Wedding" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        "Tell us about your experience with Chef Yaya and KDS Comfort Food..."
      ),
      { target: { value: "Great food!" } }
    );

    // Submit
    fireEvent.click(screen.getByText("Submit Testimonial"));

    await waitFor(() => {
      expect(mockAddDoc).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          name: "Test User",
          event: "Wedding",
          quote: "Great food!",
          rating: 5,
          approved: false,
        })
      );
    });
  });

  it("shows success message after submission", async () => {
    render(<TestimonialForm />);

    fireEvent.change(screen.getByPlaceholderText("John Smith"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Wedding" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        "Tell us about your experience with Chef Yaya and KDS Comfort Food..."
      ),
      { target: { value: "Great food!" } }
    );

    fireEvent.click(screen.getByText("Submit Testimonial"));

    await waitFor(() => {
      expect(screen.getByText("Thank You!")).toBeInTheDocument();
    });
  });

  it("shows loading state while submitting", async () => {
    // Make addDoc slow
    mockAddDoc.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ id: "1" }), 100))
    );

    render(<TestimonialForm />);

    fireEvent.change(screen.getByPlaceholderText("John Smith"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Wedding" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        "Tell us about your experience with Chef Yaya and KDS Comfort Food..."
      ),
      { target: { value: "Great food!" } }
    );

    fireEvent.click(screen.getByText("Submit Testimonial"));

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });

  it("shows Google and Yelp review links", () => {
    render(<TestimonialForm />);
    // Links have emoji prefixes, use partial text match
    expect(screen.getByText(/Google/)).toBeInTheDocument();
    expect(screen.getByText(/Yelp/)).toBeInTheDocument();
  });
});
