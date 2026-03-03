import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock firebase/auth
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    // Simulate authenticated user
    callback({
      uid: "test-uid",
      email: "chef@kdscomfortfood.com",
    });
    return vi.fn();
  }),
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/chefs-kitchen",
}));

import AdminLayout from "@/app/chefs-kitchen/layout";

describe("Admin Layout", () => {
  it("renders sidebar navigation for authenticated user", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Menu Items")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("shows user email in sidebar", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText("chef@kdscomfortfood.com")).toBeInTheDocument();
  });

  it("renders Chef's Kitchen logo text", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    // &apos; renders as regular apostrophe
    expect(screen.getByText("Chef\u0027s Kitchen")).toBeInTheDocument();
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  it("renders Sign Out button", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("renders View Site link", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    const viewSiteLink = screen.getByText(/View Site/);
    expect(viewSiteLink).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("href", "/chefs-kitchen");

    const menuLink = screen.getByText("Menu Items").closest("a");
    expect(menuLink).toHaveAttribute("href", "/chefs-kitchen/menu");

    const galleryLink = screen.getByText("Gallery").closest("a");
    expect(galleryLink).toHaveAttribute("href", "/chefs-kitchen/gallery");
  });

  it("shows Signed in as label", () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    expect(screen.getByText("Signed in as")).toBeInTheDocument();
  });
});

describe("Admin Layout — Navigation Structure", () => {
  it("nav items map to expected admin routes", () => {
    const expectedRoutes = [
      "/chefs-kitchen",
      "/chefs-kitchen/menu",
      "/chefs-kitchen/gallery",
      "/chefs-kitchen/testimonials",
      "/chefs-kitchen/pricing",
      "/chefs-kitchen/settings",
    ];

    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );

    for (const route of expectedRoutes) {
      const link = screen.getAllByRole("link").find(
        (a) => a.getAttribute("href") === route
      );
      expect(link).toBeDefined();
    }
  });
});
