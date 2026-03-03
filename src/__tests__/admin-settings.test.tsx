import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock firebase/firestore
const mockGetDoc = vi.fn();
const mockSetDoc = vi.fn();
vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  getDoc: (...args: unknown[]) => mockGetDoc(...args),
  setDoc: (...args: unknown[]) => mockSetDoc(...args),
}));

import SettingsPage from "@/app/chefs-kitchen/settings/page";

describe("Admin Settings Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        siteName: "KDS Comfort Food",
        tagline: "NYC's Premier Caterer",
        phone: "(516) 246-3030",
        email: "chefyaya@kdscomfortfood.com",
        address: "Brooklyn, New York",
        socialMedia: {
          instagram: "https://instagram.com/kdscomfortfood",
          facebook: "https://facebook.com/kdscomfortfood",
          twitter: "https://twitter.com/kdscomfortfood",
        },
      }),
    });
    mockSetDoc.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders page title", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText("Site Settings")).toBeInTheDocument();
    });
  });

  it("renders subtitle", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Manage your website/)).toBeInTheDocument();
    });
  });

  it("renders section headers", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText("Basic Information")).toBeInTheDocument();
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
      expect(screen.getByText("Social Media")).toBeInTheDocument();
    });
  });

  it("loads and displays settings from Firestore", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("KDS Comfort Food")).toBeInTheDocument();
      expect(screen.getByDisplayValue("NYC's Premier Caterer")).toBeInTheDocument();
      expect(screen.getByDisplayValue("(516) 246-3030")).toBeInTheDocument();
      expect(screen.getByDisplayValue("chefyaya@kdscomfortfood.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Brooklyn, New York")).toBeInTheDocument();
    });
  });

  it("loads social media URLs", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("https://instagram.com/kdscomfortfood")).toBeInTheDocument();
      expect(screen.getByDisplayValue("https://facebook.com/kdscomfortfood")).toBeInTheDocument();
      expect(screen.getByDisplayValue("https://twitter.com/kdscomfortfood")).toBeInTheDocument();
    });
  });

  it("renders Save Settings button", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText("Save Settings")).toBeInTheDocument();
    });
  });

  it("updates site name field", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("KDS Comfort Food")).toBeInTheDocument();
    });

    const input = screen.getByDisplayValue("KDS Comfort Food") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "KDS Comfort Food LLC" } });
    expect(input.value).toBe("KDS Comfort Food LLC");
  });

  it("updates phone field", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("(516) 246-3030")).toBeInTheDocument();
    });

    const input = screen.getByDisplayValue("(516) 246-3030") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "(718) 555-1234" } });
    expect(input.value).toBe("(718) 555-1234");
  });

  it("renders deployment info note", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Changes to these settings/)).toBeInTheDocument();
    });
  });

  it("uses default settings when Firestore doc doesn't exist", async () => {
    mockGetDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
    });

    render(<SettingsPage />);
    await waitFor(() => {
      // Should fall back to defaults
      expect(screen.getByDisplayValue("KDS Comfort Food")).toBeInTheDocument();
      expect(screen.getByDisplayValue("(516) 246-3030")).toBeInTheDocument();
    });
  });

  it("has correct input types for email and URL fields", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue("chefyaya@kdscomfortfood.com")).toBeInTheDocument();
    });

    const emailInput = screen.getByDisplayValue("chefyaya@kdscomfortfood.com");
    expect(emailInput.getAttribute("type")).toBe("email");

    const instagramInput = screen.getByDisplayValue("https://instagram.com/kdscomfortfood");
    expect(instagramInput.getAttribute("type")).toBe("url");
  });

  it("renders field labels", async () => {
    render(<SettingsPage />);
    await waitFor(() => {
      expect(screen.getByText("Site Name")).toBeInTheDocument();
      expect(screen.getByText("Tagline")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
    });
  });
});
