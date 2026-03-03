import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock firebase/auth
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback(null);
    return vi.fn();
  }),
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/chefs-kitchen/login",
}));

import AdminLoginPage from "@/app/chefs-kitchen/login/page";
import { AuthProvider } from "@/contexts/AuthContext";

const mockSignIn = signInWithEmailAndPassword as ReturnType<typeof vi.fn>;

function renderLogin() {
  return render(
    <AuthProvider>
      <AdminLoginPage />
    </AuthProvider>
  );
}

describe("Admin Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ user: { uid: "test" } });
  });

  it("renders login form with email and password fields", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("chef@kdscomfortfood.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••/)).toBeInTheDocument();
  });

  it("renders sign in button", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders Chef's Kitchen header", () => {
    renderLogin();
    // &apos; renders as regular apostrophe in JSX
    expect(screen.getByText(/Chef.*s Kitchen/)).toBeInTheDocument();
  });

  it("renders KDS Comfort Food subtitle", () => {
    renderLogin();
    expect(screen.getByText("KDS Comfort Food Admin Panel")).toBeInTheDocument();
  });

  it("renders back to website link", () => {
    renderLogin();
    const link = screen.getByText(/back to website/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("has required email input", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("chef@kdscomfortfood.com");
    expect(emailInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("has required password input", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText(/••••/);
    expect(passwordInput).toHaveAttribute("required");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("has a password visibility toggle button", () => {
    renderLogin();
    // The eye toggle button is type="button" (not submit)
    const buttons = screen.getAllByRole("button");
    const eyeButton = buttons.find((b) => b.getAttribute("type") === "button");
    expect(eyeButton).toBeTruthy();
  });

  it("updates email field on input", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("chef@kdscomfortfood.com") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("updates password field on input", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText(/••••/) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
    expect(passwordInput.value).toBe("secret123");
  });

  it("shows error on invalid credentials", async () => {
    mockSignIn.mockRejectedValueOnce({ code: "auth/invalid-credential" });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("chef@kdscomfortfood.com"), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••/), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  it("shows generic error for unknown errors", async () => {
    mockSignIn.mockRejectedValueOnce({ code: "auth/network-request-failed" });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("chef@kdscomfortfood.com"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••/), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
    });
  });
});
