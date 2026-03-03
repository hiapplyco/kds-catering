import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NAV_LINKS } from "@/lib/constants";

// Mock firestore hooks
vi.mock("@/lib/firestore-hooks", () => ({
  useSiteSettings: () => ({
    data: {
      phone: "(516) 246-3030",
      email: "chefyaya@kdscomfortfood.com",
      address: "Brooklyn, New York",
    },
  }),
}));

import Header from "@/components/layout/Header";

describe("Navigation Links", () => {
  it("NAV_LINKS contains /menu path", () => {
    const menuLink = NAV_LINKS.find((link) => link.href === "/menu");
    expect(menuLink).toBeDefined();
    expect(menuLink?.label).toBe("Menu");
  });

  it("NAV_LINKS contains all main routes", () => {
    const hrefs = NAV_LINKS.flatMap((link) =>
      link.children ? [link.href, ...link.children.map((c) => c.href)] : [link.href]
    );
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/menu");
    expect(hrefs).toContain("/gallery");
    expect(hrefs).toContain("/testimonials");
    expect(hrefs).toContain("/faq");
    expect(hrefs).toContain("/contact");
    expect(hrefs).toContain("/services/weddings");
    expect(hrefs).toContain("/services/corporate");
    expect(hrefs).toContain("/services/private-parties");
    expect(hrefs).toContain("/services/drop-off");
  });

  it("Header renders the logo", () => {
    render(<Header />);
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "KDS Comfort Food Catering");
  });

  it("Header renders primary nav links", () => {
    render(<Header />);
    expect(screen.getByText("Explore Menu")).toBeInTheDocument();
    expect(screen.getByText("See Our Work")).toBeInTheDocument();
    expect(screen.getByText("Plan Event")).toBeInTheDocument();
  });

  it("Header renders Book Your Event CTA", () => {
    render(<Header />);
    const bookButtons = screen.getAllByText("Book Your Event");
    expect(bookButtons.length).toBeGreaterThan(0);
  });

  it("Header Explore Menu links to /menu", () => {
    render(<Header />);
    const menuLink = screen.getByText("Explore Menu");
    expect(menuLink.closest("a")).toHaveAttribute("href", "/menu");
  });

  it("Header See Our Work links to /gallery", () => {
    render(<Header />);
    const galleryLink = screen.getByText("See Our Work");
    expect(galleryLink.closest("a")).toHaveAttribute("href", "/gallery");
  });
});
